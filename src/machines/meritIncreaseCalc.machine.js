import {assign, createMachine} from "xstate";

// const not = fn => (...args) => !fn.apply(null, args);
// const isZero = (context, event) => event.key === 0;
// const isNotZero = not(isZero);
// const isMinus = (context, event) => event.operator === "-";
// const isNotMinus = not(isMinus);
// // eslint-disable-next-line no-unused-vars
// const divideByZero = (context, event) =>
//     context.operand2 === "0." && context.operator === "/";
// const notDivideByZero = not(divideByZero);

// function doMath(operand1, operand2, operator) {
//   switch (operator) {
//     case "+":
//       return +operand1 + +operand2;
//     case "-":
//       return +operand1 - +operand2;
//     case "/":
//       return +operand1 / +operand2;
//     case "x":
//       return +operand1 * +operand2;
//     default:
//       return Infinity;
//   }
// }
// function invokeCalcMeritIncrease(ctx) {
//
//   console.log('ERntye')
//
//   for (let i = 0; i < ctx.duration; i++) {
//     switch (i) {
//       case 0:
//         ctx.data.push(ctx.annualIncome);
//         break;
//       case 1:
//         ctx.data.push(ctx.data[0] * ctx.meritPercentage + ctx.data[0]);
//         break;
//       default:
//         ctx.data.push(ctx.data[i-1] * ctx.meritPercentage + ctx.data[i-1]);
//         break;
//     }
//   }
//
//   console.log(ctx.data);
//
//   return 0;
// }

const meritIncreaseCalcMachine = createMachine(
    {
      id: "meritIncreaseCalc",
      context: {
        data: [],
        meritPercentage: 0,
        annualIncome: 0,
        duration: 0,
      },
      // strict: true,
      on: {
        UPDATE_MERIT: {
          actions: ["updateMerit"]
        },
        UPDATE_ANNUAL: {
          actions: ["updateAnnual"]
        },
        UPDATE_DURATION: {
          actions: ["updateDuration"]
        },
        CALCULATE: {
          actions: ['calculate']
        }
      },
      initial: "idle",
      states: {
        idle: {},
      }
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
        updateMerit: assign({
          meritPercentage: (_, event) => {
            return event.value / 100
          }
        }),
        updateAnnual: assign({
          annualIncome: (_, event) => {
            return event.value * 1
          }
        }),
        updateDuration: assign({
          duration: (_, event) => {
            return event.value * 1
          }
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
                    increase: '$' + parseFloat((ctx.annualIncome * ctx.meritPercentage).toFixed(2)),
                    total: '$' + parseFloat((ctx.annualIncome * ctx.meritPercentage + ctx.annualIncome).toFixed(2))
                  });

                  // prevEarned =  ctx.annualIncome * ctx.meritPercentage;
                  prevTotal = ctx.annualIncome * ctx.meritPercentage + ctx.annualIncome;
                  break;
                default:
                  results.push({
                    id: i,
                    increase: '$' + parseFloat((prevTotal * ctx.meritPercentage).toFixed(2)),
                    total: '$' + parseFloat((prevTotal * ctx.meritPercentage + prevTotal).toFixed(2)),
                  });

                  // prevEarned =  results[i - 1].total * ctx.meritPercentage;
                  prevTotal = prevTotal * ctx.meritPercentage + prevTotal;
                  break;
              }
            }

            return results;
          }
        })

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
      }
    }
);

export default meritIncreaseCalcMachine;
