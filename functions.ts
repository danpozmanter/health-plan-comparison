const personal_responsibility = (
  raw_costs: number,
  deductible: number,
  coinsurance: number,
  outofpocketmax: number,
) => {
  /* Personal responsibility translated from spreadsheet.  
    =IF(
        expenses < deductible, 
          expenses, 
          IF(oomax < deductible + (expenses - deductible) * coinsurance, 
            oomax,
            deductible + (expenses - deductible) * coinsurance
          )
      )
  */
  if (raw_costs < deductible) {
    return raw_costs;
  }
  const spend = (raw_costs - deductible) * (coinsurance / 100);
  if (outofpocketmax < deductible + spend) {
    return outofpocketmax;
  }
  return deductible + spend;
};

const calculate_medical_costs = (
  premium_total: number,
  sa_cost: number,
  deductible: number,
  copay: number,
  coinsurance: number,
  outofpocketmax: number,
  sa_total: number,
  doctor_visits: number,
  doc_cost: number,
  raw_costs: number,
) => {
  // Raw costs includes imaging, out of office tests, or expensive hospital stays.
  // Copays do not count towards deductible, only out of pocket max.
  const doctor_cost =
    copay != 0
      ? doctor_visits * copay
      : doctor_visits * doc_cost * (coinsurance / 100);
  const responsibility = personal_responsibility(
    raw_costs,
    deductible,
    coinsurance,
    outofpocketmax,
  );
  const sa = Math.min(responsibility + doctor_cost, sa_total);
  const total_cost = responsibility + doctor_cost - sa;
  if (total_cost > outofpocketmax) {
    return outofpocketmax;
  }
  return Math.round(total_cost + premium_total + sa_cost);
  // If you'd prefer to include the costs down to the penny:
  // return Math.round((total_cost + premium_total + sa_cost + Number.EPSILON) * 100) / 100;
};

const get_total_spending_account_amount = (
  fsa_employee: number,
  fsa_employer: number,
  hsa_employee: number,
  hsa_employer: number,
) => {
  // Calculate and return the total annual amount for the active spending account.
  // Only an HSA or a FSA will be active, not both.
  const fsa_total = fsa_employee + fsa_employer;
  const hsa_total = hsa_employee + hsa_employer;
  if (fsa_total != 0) {
    return fsa_total;
  } else if (hsa_total != 0) {
    return hsa_total;
  }
  return 0;
};

const get_total_spending_account_cost = (
  // Calculate and return the total annual cost for the active spending account.
  // Only an HSA or a FSA will be active, not both.
  total_tax_rate: number,
  fsa_employee: number,
  hsa_employee: number,
) => {
  const fsa_cost = fsa_employee * (1 - total_tax_rate);
  const hsa_cost = hsa_employee * (1 - total_tax_rate);
  if (fsa_cost != 0) {
    return fsa_cost;
  } else if (hsa_cost != 0) {
    return hsa_cost;
  }
  return 0;
};

export const get_medical_costs = (form: any) => {
  // Retrieve the scenario costs, and a list of general costs for each health plan under consideration.

  const total_tax_rate = (form.federal + form.state + form.fica) / 100.0;
  const premium_costsA = form.premiumA * 24 * (1 - total_tax_rate);
  const premium_costsB = form.premiumB * 24 * (1 - total_tax_rate);
  const sa_cost_a = get_total_spending_account_cost(
    total_tax_rate,
    form.fsaEmployeeA,
    form.hsaEmployeeA,
  );
  const sa_cost_b = get_total_spending_account_cost(
    total_tax_rate,
    form.fsaEmployeeB,
    form.hsaEmployeeB,
  );
  const sa_total_a = get_total_spending_account_amount(
    form.fsaEmployeeA,
    form.fsaEmployerA,
    form.hsaEmployeeA,
    form.hsaEmployerA,
  );
  const sa_total_b = get_total_spending_account_amount(
    form.fsaEmployeeB,
    form.fsaEmployerB,
    form.hsaEmployeeB,
    form.hsaEmployerB,
  );

  // Scenario

  const expenses = `${form.otherExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  const costsA = calculate_medical_costs(
    premium_costsA,
    sa_cost_a,
    form.deductibleA,
    form.copayA,
    form.coinsuranceA,
    form.outOfPocketMaxA,
    sa_total_a,
    form.doctorVisits,
    form.averageDoctorCost,
    form.otherExpenses,
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const costsB = calculate_medical_costs(
    premium_costsB,
    sa_cost_b,
    form.deductibleB,
    form.copayB,
    form.coinsuranceB,
    form.outOfPocketMaxB,
    sa_total_b,
    form.doctorVisits,
    form.averageDoctorCost,
    form.otherExpenses,
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const scenario = [form.doctorVisits, expenses, costsA, costsB];

  // General Costs
  const costs = [];
  for (let i = 0; i < 50001; i += 1000) {
    const expenses = `${i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const costsA = calculate_medical_costs(
      premium_costsA,
      sa_cost_a,
      form.deductibleA,
      form.copayA,
      form.coinsuranceA,
      form.outOfPocketMaxA,
      sa_total_a,
      0,
      form.averageDoctorCost,
      i,
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const costsB = calculate_medical_costs(
      premium_costsB,
      sa_cost_b,
      form.deductibleB,
      form.copayB,
      form.coinsuranceB,
      form.outOfPocketMaxB,
      sa_total_b,
      0,
      form.averageDoctorCost,
      i,
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    costs.push([expenses, costsA, costsB]);
  }
  return [scenario, costs];
};

export const costs_to_rows = (medical_costs: string[][]) => {
  // Build out the html rows for each row of medical costs.
  let rows = "";
  for (const i in medical_costs) {
    rows += `
    <tr>
      <td class="border p-5">$${medical_costs[i][0]}</td>
      <td class="border p-5">$${medical_costs[i][1]}</td>
      <td class="border p-5">$${medical_costs[i][2]}</td>
    </tr>`;
  }
  return rows;
};

export const export_to_csv = (medical_costs: string[][]) => {
  // Simple export of the data (expenses, not the example scenario) to csv.
  for (const i in medical_costs) {
    medical_costs[i][0] = `"${medical_costs[i][0]}"`;
    medical_costs[i][1] = `"${medical_costs[i][1]}"`;
    medical_costs[i][2] = `"${medical_costs[i][2]}"`;
  }
  const csvContent =
    "data:text/csv;charset=utf-8," +
    medical_costs.map((e) => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
};

export const store_local_form = (form: any) => {
  // Store the entry form locally for convenience.
  localStorage.setItem("healthPlanForm", JSON.stringify(form));
};

export const load_local_form = () => {
  // Load the entry form from local storage.
  return localStorage.getItem("healthPlanForm");
};
