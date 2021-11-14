import { assign, createMachine } from "xstate";
import Dinero from "dinero.js";

function toPrice(amount, factor = Math.pow(10, 2)) {
  return Dinero({ amount: Math.round(amount * factor) });
}

export const moneyCategories = [
  {
    id: 1,
    category: { name: "Income" },
    value: 2, // This is the number of times that it is added per month
  },
  {
    id: 2,
    category: { name: "Passive" },
    value: 1, // This is the number of times that it is added per month
  },
  {
    id: 3,
    category: { name: "Monthly" },
    value: 1, // This is the number of times that it is added per month
  },
  {
    id: 4,
    category: { name: "Credit" },
    value: -1, // This is the number of times that it is added per month
  },
  {
    id: 5,
    category: { name: "Loan" },
    value: -1, // This is the number of times that it is added per month
  },
  {
    id: 6,
    category: { name: "Gas" },
    value: 0, // This is the number of times that it is added per month
  },
  {
    id: 7,
    category: { name: "Food" },
    value: 2, // This is the number of times that it is added per month
  },
  {
    id: 8,
    category: { name: "One-Time" },
    value: 2, // This is the number of times that it is added per month
  },
];

const initialState = {
  duration: 0,
  expenses: [],
  futureExpenses: [],
  incomeStreams: [],
  savings: []
};

export const expectedFinancesMachine = createMachine(
  {
    id: "expectedFinancesCalc",

    context: initialState,
    // strict: true,
    on: {
      ADD_EXPENSE: {
        actions: ["addExpense", "persistState"],
      },
      EDIT_EXPENSE: {
        actions: ["editExpense", "persistState"],
      },
      DELETE_EXPENSE: {
        actions: ["deleteExpense", "persistState"],
      },
      ADD_INCOME: {
        actions: ["addIncome", "persistState"],
      },
      DELETE_INCOME: {
        actions: ["deleteIncome", "persistState"],
      },
      ADD_SAVINGS: {
        actions: ["addSavings", "persistState"],
      },
      EDIT_SAVINGS: {
        actions: ["editSavings", "persistState"],
      },
      DELETE_SAVINGS: {
        actions: ["deleteSavings", "persistState"],
      },
      ADD_FUTURE: {
        actions: ["addFuture", "persistState"],
      },
      EDIT_FUTURE: {
        actions: ["editFuture", "persistState"],
      },
      DELETE_FUTURE: {
        actions: ["deleteFuture", "persistState"],
      },
      UPDATE_ANNUAL: {
        actions: ["updateAnnual"],
      },
      UPDATE_DURATION: {
        actions: ["updateDuration", "persistState"],
      },
      CALCULATE: {
        actions: ["calculate"],
      },
    },
    initial: "loadData",
    states: {
      loadData: {
        entry: ["getState"],
      },
    },
  },
  {
    // guards: {
    //   isMinus,
    //   isNotMinus,
    //   isZero,
    //   isNotZero,
    //   notDivideByZero
    // },
    actions: {
      getState: assign(() => {
        if (localStorage.appState) {
          const state = JSON.parse(localStorage.getItem("appState"));

          return {
            duration: state.duration,
            expenses: state.expenses,
            incomeStreams: state.incomeStreams,
            futureExpenses: state.futureExpenses,
            savings: state.savings
          };
        }

        return {
          duration: initialState.duration,
          expenses: initialState.expenses,
          incomeStreams: initialState.incomeStreams,
          futureExpenses: initialState.futureExpenses,
          savings: initialState.savings
        }
      }),
      persistState: (ctx) => {
        const jsonState = JSON.stringify(ctx);

        // Example: persisting to localStorage
        try {
          localStorage.setItem("appState", jsonState);
        } catch (e) {
          // unable to save to localStorage
        }
      },
      addExpense: assign({
        expenses: (ctx, event) => {
          const expenses = [
            ...ctx.expenses,
            {
              // id: ctx.expenses.length + 1,
              name: event.value.name,
              context: event.value.context,
              amount: event.value.amount,
              time: event.value.time,
              apply: event.value.apply,
            },
          ];

          return expenses;
        },
      }),
      deleteExpense: assign({
        expenses: (ctx, event) => {
          let newExpenses = ctx.expenses;
          const idx = ctx.expenses.findIndex(
            (item) => item === event.value
          );
          console.log(idx)
          console.log(newExpenses.splice(idx, 1))
          newExpenses = newExpenses.splice(idx, 1);
          console.log(newExpenses)

          return newExpenses;
        },
      }),
      addSavings: assign({
        savings: (ctx, event) => {
          const savings = [
            ...ctx.savings,
            {
              // id: ctx.expenses.length + 1,
              name: event.value.name,
              context: event.value.context,
              amount: event.value.amount,
              time: event.value.time,
              apply: event.value.apply,
            },
          ];

          return savings;
        },
      }),
      deleteSavings: assign({
        savings: (ctx, event) => {
          let newSavings = ctx.savings;
          const idx = ctx.savings.findIndex(
            (item) => item === event.value
          );
          console.log(idx)
          console.log(newSavings.splice(idx, 1))
          newSavings = newSavings.splice(idx, 1);
          console.log(newSavings)

          return newSavings;
        },
      }),
      addFuture: assign({
        futureExpenses: (ctx, event) => {
          const futureExpenses = [
            ...ctx.futureExpenses,
            {
              // id: ctx.expenses.length + 1,
              name: event.value.name,
              context: event.value.context,
              amount: event.value.amount,
              time: event.value.time,
              apply: event.value.apply,
            },
          ];

          return futureExpenses;
        },
      }),
      deleteFuture: assign({
        futureExpenses: (ctx, event) => {
          let newFutures = ctx.futureExpenses;
          const idx = ctx.futureExpenses.findIndex(
            (item) => item === event.value
          );
          console.log(idx)
          console.log(newFutures.splice(idx, 1))
          newFutures = newFutures.splice(idx, 1);
          console.log(newFutures)

          return newFutures;
        },
      }),
      addIncome: assign({
        incomeStreams: (ctx, event) => {
          const income = [
            ...ctx.incomeStreams,
            {
              // id: ctx.incomeStreams.length + 1,
              name: event.value.name,
              context: event.value.context,
              amount: event.value.amount,
              time: event.value.time,
              apply: event.value.apply,
            },
          ];

          return income;
        },
      }),
      deleteIncome: assign({
        incomeStreams: (ctx, event) => {
          let newIncomes = ctx.incomeStreams;
          const idx = ctx.incomeStreams.findIndex(
            (item) => item === event.value
          );
          console.log(idx)
          console.log(newIncomes.splice(idx, 1))
          newIncomes = newIncomes.splice(idx, 1);
          console.log(newIncomes)

          return newIncomes;
        },
      }),

      updateMerit: assign({
        meritPercentage: (_, event) => {
          return event.value / 100;
        },
      }),
      updateAnnual: assign({
        annualIncome: (_, event) => {
          return event.value * 1;
        },
      }),
      updateDuration: assign({
        duration: (ctx, event) => event.value,
      }),
      calculate: assign({
        data: (ctx) => {
          let results = [];
          let prevTotal = 0;
          // let prevEarned = 0;

          for (let i = 1; i <= ctx.duration; i++) {
            switch (i) {
              // case 0:
              //   results.push({id: i, earned: 0, total: });
              //   break;
              case 1:
                results.push({
                  id: i,
                  increase: toPrice(
                    ctx.annualIncome * ctx.meritPercentage
                  ).toFormat(),
                  total: toPrice(
                    ctx.annualIncome * ctx.meritPercentage + ctx.annualIncome
                  ).toFormat(),
                });

                // prevEarned =  ctx.annualIncome * ctx.meritPercentage;
                prevTotal =
                  ctx.annualIncome * ctx.meritPercentage + ctx.annualIncome;
                break;
              default:
                results.push({
                  id: i,
                  increase: toPrice(prevTotal * ctx.meritPercentage).toFormat(),
                  total: toPrice(
                    prevTotal * ctx.meritPercentage + prevTotal
                  ).toFormat(),
                });

                // prevEarned =  results[i - 1].total * ctx.meritPercentage;
                prevTotal = prevTotal * ctx.meritPercentage + prevTotal;
                break;
            }
          }

          return results;
        },
      }),

      // defaultReadout: assign({
      //   display: () => "0."
      // }),
      //
      // defaultNegativeReadout: assign({
      //   display: () => "-0."
      // }),
      //
      // appendNumBeforeDecimal: assign({
      //   display: (context, event) =>
      //       context.display.slice(0, -1) + event.key + "."
      // }),
      //
      // appendNumAfterDecimal: assign({
      //   display: (context, event) => context.display + event.key
      // }),
      //
      // setReadoutNum: assign({
      //   display: (context, event) => event.key + "."
      // }),
      //
      // setNegativeReadoutNum: assign({
      //   display: (context, event) => "-" + event.key + "."
      // }),
      //
      // startNegativeNumber: assign({
      //   display: () => "-"
      // }),
      //
      // recordOperator: assign({
      //   operand1: context => context.display,
      //   operator: (_, event) => event.operator
      // }),
      //
      // setOperator: assign({
      //   operator: ({operator}) => operator
      // }),
      //
      // computePercentage: assign({
      //   display: context => context.display / 100
      // }),
      //
      // compute: assign({
      //   display: ({operand1, operand2, operator}) => {
      //     const result = doMath(operand1, operand2, operator);
      //     console.log(
      //         `doing calculation ${operand1} ${operator} ${operand2} = ${result}`
      //     );
      //     return result;
      //   }
      // }),
      //
      // storeResultAsOperand1: assign({
      //   operand1: context => context.display
      // }),
      //
      // storeResultAsOperand2: assign({
      //   operand2: context => context.display
      // }),
      //
      // divideByZeroAlert() {
      //   // have to put the alert in setTimeout because action is executed on event, before the transition to next state happens
      //   // this alert is supposed to happend on transition
      //   // setTimeout allows time for other state transition (to 'alert' state) to happen before showing the alert
      //   // probably a better way to do it. like entry or exit actions
      //   setTimeout(() => {
      //     alert("Cannot divide by zero!");
      //     this.transition("OK");
      //   }, 0);
      // },
      //
      // reset: assign({
      //   display: () => "0.",
      //   operand1: () => null,
      //   operand2: () => null,
      //   operator: () => null
      // })
    },
  }
);

// export default expectedFinancesMachine;
