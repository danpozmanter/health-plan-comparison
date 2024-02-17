# Health Plan Comparison

Building off [this spreadsheet](https://docs.google.com/spreadsheets/d/1EzbKIbU5MGzevr6Rncp5UmFVzFjZIksNJJ3RGqEhz2E/edit?usp=sharing) from [this reddit post](https://www.reddit.com/r/personalfinance/comments/2k3k78/trying_to_compare_health_insurance_plans/),
this is a simple tool to help compare two health insurance plans.

[Give it a try (hosted on Github Pages)](https://danpozmanter.github.io/health-plan-comparison/).

Changes from the spreadsheet:

* I've added an "example scenario" and copay (if primary and specialist copays are different, I recommend using the specialist copay). This is only used for the example scenario.
* I've made it so you can compare FSA or HSA for either plan, rather than comparing one low deductible + FSA and one high deductible + HSA plan.

## Run (Dev)

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev -o
```

## Development Server

```bash
# pnpm
pnpm run dev
```

## Build

Build the application (static for github pages):

```bash
pnpm run generate
pnpm run deploy
```
