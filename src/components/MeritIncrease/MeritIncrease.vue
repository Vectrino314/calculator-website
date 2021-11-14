<template>
  <div class="columns">
    <div class="column is-one-third">
      <!--      <div class="section">-->
      <div class="card sticky">
        <header class="card-header">
          <p class="card-header-title">Merit Increase Calculator</p>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-calculator" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div class="card-content">
          <div class="content">
            <!--              <h3 class="subtitle">With Material Design Icons</h3>-->
            <!--              <b-field>-->
            <!--                <b-input placeholder="Search..."-->
            <!--                         type="search"-->
            <!--                         icon="magnify"-->
            <!--                         icon-clickable-->
            <!--                         @icon-click="searchIconClick">-->
            <!--                </b-input>-->
            <!--              </b-field>-->

            <!--              <b-field>-->
            <!--                <b-input placeholder="Email"-->
            <!--                         v-model="email"-->
            <!--                         type="email"-->
            <!--                         icon="email"-->
            <!--                         icon-right="close-circle"-->
            <!--                         icon-right-clickable-->
            <!--                         @icon-right-click="clearIconClick">-->
            <!--                </b-input>-->
            <!--              </b-field>-->

            <!--              <b-field>-->
            <!--                <b-input placeholder="Credit card"-->
            <!--                         icon="credit-card">-->
            <!--                </b-input>-->
            <!--              </b-field>-->

            <!--              <h3 class="subtitle">With FontAwesome</h3>-->
            <b-field>
              <b-input
                placeholder="Merit Increase Percentage"
                type="number"
                v-model="meritPercentage"
                icon-pack="fas"
                icon-right="percentage"
                icon="graduation-cap"
                @input="send('UPDATE_MERIT', { value: meritPercentage })"
              >
              </b-input>
            </b-field>

            <b-field>
              <b-input
                placeholder="Annual Income"
                type="number"
                v-model="annualIncome"
                icon-pack="fas"
                icon="dollar-sign"
                @input="send('UPDATE_ANNUAL', { value: annualIncome })"
              >
              </b-input>
            </b-field>

            <b-field>
              <b-input
                placeholder="Years"
                type="number"
                v-model="duration"
                icon-pack="fas"
                icon="hourglass-half"
                @input="send('UPDATE_DURATION', { value: duration })"
              >
              </b-input>
            </b-field>

            <b-button @click="calculateMeritIncrease()" expanded>
              Calculate
            </b-button>
          </div>
        </div>
      </div>
      <br />
      <b-collapse
        aria-id="contentIdForA11y2"
        class="panel"
        animation="slide"
        v-model="isOpen"
      >
        <template #trigger>
          <div
            class="panel-heading"
            role="button"
            aria-controls="contentIdForA11y2"
          >
            <strong>Raw Json</strong>
          </div>
        </template>
        <!--        <p class="panel-tabs">-->
        <!--          <a class="is-active">All</a>-->
        <!--          <a>Public</a>-->
        <!--          <a>Private</a>-->
        <!--        </p>-->
        <div class="panel-block">
          <pre style="width: 100%">{{ state.context }}</pre>
        </div>
      </b-collapse>

      <!--      </div>-->
    </div>
    <!--    <div class="column">Auto</div>-->
    <div class="column">
      <div v-if="state.context.data.length > 0">
      <GeneralStats
        v-bind:finalResult="state.context.data[state.context.data.length - 1].total"
        v-bind:initalAmount="state.context.data[0].total"
      ></GeneralStats>
        <!--        <p>There is data</p>-->
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Results - Starting Salary of
              {{ toPrice(state.context.annualIncome).toFormat() }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <b-table
                :bordered="true"
                :striped="true"
                :data="state.context.data"
                :columns="columns"
              >
              </b-table>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p>This is where the description for the calculator will go</p>
      </div>
      <!--      Table Auto-->
    </div>
  </div>
</template>

<script>
import meritIncreaseCalcMachine from "@/machines/meritIncreaseCalc.machine";
import { useMachine } from "@xstate/vue";
import Dinero from "dinero.js";
import GeneralStats from "./GeneralStats.vue";
// import {interpret} from "xstate";

// }
// const state$ = from(this.service);

export default {
  components: { GeneralStats },
  name: "MeritIncrease",
  // domStreams: ['state$'],
  setup() {
    const { state, send, service } = useMachine(meritIncreaseCalcMachine, {
      devTools: true,
    });

    return {
      state,
      send,
      service,
      // buttons,
      // handleButtonClick,
      // buttonDescription
    };
  },
  data() {
    return {
      isOpen: false,
      data: [],
      meritPercentage: null,
      annualIncome: null,
      duration: null,
      columns: [
        {
          field: "id",
          label: "Year",
          width: "40",
          numeric: true,
        },
        {
          field: "increase",
          label: "Increase",
          numeric: true,
        },
        {
          field: "total",
          label: "Total",
          numeric: true,
        },
      ],
    };
  },
  // subscriptions() {
  //   const state$ = this.$watchAsObservable("this.srv", {immediate: true})
  //   return {
  //     state$
  //   }
  // },
  // beforeDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.subscription.unsubscribe();
  // },
  // mounted() {
  //
  // }
  methods: {
    toPrice(amount, factor = Math.pow(10, 2)) {
      return Dinero({ amount: Math.round(amount * factor) }).setLocale(
        this.language
      );
    },
    searchIconClick() {
      alert("You wanna make a search?");
    },
    clearIconClick() {
      this.email = "";
      alert("Email cleared!");
    },
    calculateMeritIncrease() {
      this.send("CALCULATE");
    },
  },
};
</script>

<style scoped>
</style>
