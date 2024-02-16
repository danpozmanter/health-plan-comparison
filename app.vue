<template>
  <div class="p-5 w-full">
    Based off of
    <a
      class="text-blue-500"
      href="https://docs.google.com/spreadsheets/d/1EzbKIbU5MGzevr6Rncp5UmFVzFjZIksNJJ3RGqEhz2E/edit?usp=sharing"
      >this spreadsheet</a
    >
    from
    <a
      class="text-blue-500"
      href="https://www.reddit.com/r/personalfinance/comments/2k3k78/trying_to_compare_health_insurance_plans/"
      >this reddit post</a
    >. I've added an "example scenario", which will use either copay (if not 0),
    or coinsurance times an "average" doctor visit cost.
  </div>
  <div class="w-full grid grid-cols-1 md:grid-cols-2 bg-white text-sm p-5">
    <form
      class="bg-stone-100 shadow-md border border-stone-500 rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="handleSubmit"
    >
      <div class="grid grid-cols-2 gap-2 min-w-180">
        <div class="min-w-full">
          <label class="block text-gray-700 text-md font-bold mb-2">
            Taxes
          </label>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Federal Tax Rate
          </label>
          <input
            v-model.number="form.federal"
            step="any"
            type="number"
            name="federal"
            placeholder="Federal Tax Rate"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            State Tax Rate
          </label>
          <input
            v-model.number="form.state"
            step="any"
            type="number"
            name="state"
            placeholder="State Tax Rate"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            FICA Tax Rate
          </label>
          <input
            v-model.number="form.fica"
            step="any"
            type="number"
            name="fica"
            placeholder="FICA Tax Rate"
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label class="block text-gray-700 text-md font-bold mb-2">
            Example Scenario
          </label>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Doctor Visits
          </label>
          <input
            v-model.number="form.doctorVisits"
            step="any"
            type="number"
            name="doctorVisits"
            placeholder="Doctor Visits per Year"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Average Visit Cost
          </label>
          <input
            v-model.number="form.averageDoctorCost"
            step="any"
            type="number"
            name="averageDoctorCost"
            placeholder="Average Cost per Doctor Visit"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Other Expenses
          </label>
          <input
            v-model.number="form.otherExpenses"
            step="any"
            type="number"
            name="otherExpenses"
            placeholder="Other Expenses"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="grid grid-cols-2 gap-2 min-w-full">
        <div class="shadow border border-stone-400 bg-stone-300 p-5 min-w-full">
          <label class="block text-gray-700 text-md font-bold mb-2">
            Plan A
          </label>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Premium (Biweekly)
          </label>
          <input
            v-model.number="form.premiumA"
            step="any"
            type="number"
            name="premiumA"
            placeholder="Monthly Premium"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Deductible
          </label>
          <input
            v-model.number="form.deductibleA"
            step="any"
            type="number"
            name="deductibleA"
            placeholder="Deductible"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Copay (0 if None)
          </label>
          <input
            v-model.number="form.copayA"
            step="any"
            type="number"
            name="copayA"
            placeholder="copay"
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            CoInsurance
          </label>
          <input
            v-model.number="form.coinsuranceA"
            step="any"
            type="number"
            name="coinsuranceA"
            placeholder="coinsurance"
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Out of Pocket Maximum
          </label>
          <input
            v-model.number="form.outOfPocketMaxA"
            step="any"
            type="number"
            name="outOfPocketMaxA"
            placeholder="Out of Pocket Max"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            FSA Employer Contribution
          </label>
          <input
            v-model.number="form.fsaEmployerA"
            step="any"
            type="number"
            name="fsaEmployerA"
            placeholder="FSA Employer Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            FSA Employee Contribution
          </label>
          <input
            v-model.number="form.fsaEmployeeA"
            step="any"
            type="number"
            name="fsaEmployeeA"
            placeholder="FSA Employee Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            HSA Employer Contribution
          </label>
          <input
            v-model.number="form.hsaEmployerA"
            step="any"
            type="number"
            name="hsaEmployerA"
            placeholder="HSA Employer Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            HSA Employee Contribution
          </label>
          <input
            v-model.number="form.hsaEmployeeA"
            step="any"
            type="number"
            name="hsaEmployeeA"
            placeholder="HSA Employee Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="shadow border border-stone-300 bg-stone-200 p-5">
          <label class="block text-gray-700 text-md font-bold mb-2">
            Plan B
          </label>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Premium (Biweekly)
          </label>
          <input
            v-model.number="form.premiumB"
            step="any"
            type="number"
            name="premiumB"
            placeholder="Monthly Premium"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Deductible
          </label>
          <input
            v-model.number="form.deductibleB"
            step="any"
            type="number"
            name="deductibleB"
            placeholder="Deductible"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Copay (0 if None)
          </label>
          <input
            v-model.number="form.copayB"
            step="any"
            type="number"
            name="copayB"
            placeholder="copay"
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            CoInsurance
          </label>
          <input
            v-model.number="form.coinsuranceB"
            step="any"
            type="number"
            name="coinsuranceB"
            placeholder="coinsurance"
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Out of Pocket Maximum
          </label>
          <input
            v-model.number="form.outOfPocketMaxB"
            step="any"
            type="number"
            name="outOfPocketMaxB"
            placeholder="Out of Pocket Max"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            FSA Employer Contribution
          </label>
          <input
            v-model.number="form.fsaEmployerB"
            step="any"
            type="number"
            name="fsaEmployerB"
            placeholder="FSA Employer Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            FSA Employee Contribution
          </label>
          <input
            v-model.number="form.fsaEmployeeB"
            step="any"
            type="number"
            name="fsaEmployeeB"
            placeholder="FSA Employee Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            HSA Employer Contribution
          </label>
          <input
            v-model.number="form.hsaEmployerB"
            step="any"
            type="number"
            name="hsaEmployerB"
            placeholder="HSA Employer Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label class="block text-gray-700 text-sm font-bold mb-2">
            HSA Employee Contribution
          </label>
          <input
            v-model.number="form.hsaEmployeeB"
            step="any"
            type="number"
            name="hsaEmployeeB"
            placeholder="HSA Employee Contribution"
            required
            class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div class="flex items-center justify-between p-5">
        <div>
          <input
            v-model="form.exportToCsv"
            type="checkbox"
            name="exportToCsv"
            class="w-4 h-4 ps-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            value="false"
          />
          <label class="px-5 text-gray-700 text-sm mb-2" for="exportToCsv"
            >Export to CSV</label
          >
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Compare
        </button>
      </div>
    </form>
    <div id="output" class="px-5 text-gray-700 text-sm mb-2"></div>
  </div>
</template>

<script lang="ts">
import {
  get_medical_costs,
  costs_to_rows,
  export_to_csv,
  load_local_form,
  store_local_form,
} from "./functions";
export default {
  name: "ContactForm",
  data() {
    // Default values for form_data:
    var form_data = {
      federal: 0,
      state: 5,
      fica: 7.65,
      doctorVisits: 0,
      averageDoctorCost: 150,
      otherExpenses: 0,
      premiumA: 0,
      deductibleA: 0,
      copayA: 0,
      coinsuranceA: 0,
      outOfPocketMaxA: 0,
      fsaEmployerA: 0,
      fsaEmployeeA: 0,
      hsaEmployerA: 0,
      hsaEmployeeA: 0,
      premiumB: 0,
      deductibleB: 0,
      copayB: 0,
      coinsuranceB: 0,
      outOfPocketMaxB: 0,
      fsaEmployerB: 0,
      fsaEmployeeB: 0,
      hsaEmployerB: 0,
      hsaEmployeeB: 0,
      exportToCsv: false,
    };
    // Pick up where we left off if there's a local record.
    let form_values = load_local_form();
    if (form_values != null) {
      form_data = JSON.parse(form_values);
    }
    return {
      form: form_data,
    };
  },
  methods: {
    handleSubmit: async function () {
      let fsa_a_active = (this.form.fsaEmployeeA != 0) || (this.form.fsaEmployerA != 0);
      let hsa_a_active = (this.form.hsaEmployeeA != 0) || (this.form.hsaEmployerA != 0);
      if (fsa_a_active && hsa_a_active) {
        alert("FSA and HSA cannot both be active for Plan A");
      }
      let fsa_b_active = (this.form.fsaEmployeeB != 0) || (this.form.fsaEmployerB != 0);
      let hsa_b_active = (this.form.hsaEmployeeB != 0) || (this.form.hsaEmployerB != 0);
      if (fsa_b_active && hsa_b_active) {
        alert("FSB and HSB cannot both be active for Plan B");
      }
      let output = document.getElementById("output");
      if (output == null) {
        alert("Weird. Output element not found!");
        return;
      }
      store_local_form(this.form); // On submit, let's store the form so the user can pick up where they left off.
      let [scenario, medical_costs] = get_medical_costs(this.form);
      let rows = costs_to_rows(medical_costs);
      let comparison = `
          <div class="block text-gray-700 text-sm font-bold mb-2 py-5">Example Scenario</div>
          <table class="px-10 table-auto w-lg shadow border border-gray-200 rounded">
            <thead class="bg-slate-100">
              <tr>
                <th class="border-b p-5 text-left">Doctor Visits</th>
                <th class="border-b p-5 text-left">Other Expenses</th>
                <th class="border-b p-5 text-left">Plan A Total Effective Cost</th>
                <th class="border-b p-5 text-left">Plan B Total Effective Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-5">${scenario[0]}</td>
                <td class="border p-5">$${scenario[1]}</td>
                <td class="border p-5">$${scenario[2]}</td>
                <td class="border p-5">$${scenario[3]}</td>
              </tr>
            </tbody>
          </table>
          <div class="block text-gray-700 text-sm font-bold mb-2 py-5">General Expenses</div>
          <table class="px-10 table-auto w-lg shadow border border-gray-200 rounded">
            <thead class="bg-slate-100">
              <tr>
                <th class="border-b p-5 text-left">Healthcare Expenses</th>
                <th class="border-b p-5 text-left">Plan A Total Effective Cost</th>
                <th class="border-b p-5 text-left">Plan B Total Effective Cost</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        `;
      output.innerHTML = comparison;

      if (this.form.exportToCsv) {
        export_to_csv(medical_costs);
      }
    },
  },
};
</script>
