<template>
  <div>
    <b-tabs type="is-toggle" expanded>
      <b-tab-item label="Data">
        <div class="card">
          <header class="card-header" style="background-color: lightgreen">
            <p class="card-header-title">Expected Finances Calculator</p>
            <button class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-calculator" aria-hidden="true"></i>
              </span>
            </button>
          </header>
          <div class="card-content">
            <!-- <div class="content"> -->
            <b-tabs type="is-toggle" expanded>
              <b-tab-item label="Income Streams">
                <IncomeStreams :machine="service"></IncomeStreams>
              </b-tab-item>
              <b-tab-item label="Expenses">
                <Expenses :machine="service"></Expenses>
              </b-tab-item>
              <b-tab-item label="Savings & Deposits">
                <Savings :machine="service"></Savings>
              </b-tab-item>
              <b-tab-item label="Future Expenses">
                <FutureExpenses :machine="service"></FutureExpenses>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="Results" icon="library-music">
        <b-field label="Time in Months">
          <b-numberinput
            v-model="duration"
            controls-position="compact"
          ></b-numberinput>
        </b-field>
        <b-table :data="combinedData" :bordered="true" :striped="true">
          <b-table-column field="name" label="Name" v-slot="props">
            {{ props.row.name }}
            <!-- <b-icon
                pack="fas"
                icon="user"
                size="is-small">
            </b-icon> -->
          </b-table-column>

          <b-table-column field="amount" label="Amount" centered v-slot="props">
            {{ toPrice(props.row.amount).toFormat() }}
          </b-table-column>

          <b-table-column field="context" label="Context" v-slot="props">
            <b-field grouped group-multiline>
              <div
                v-for="tag in props.row.context"
                :key="tag.id"
                class="control"
              >
                <b-tag type="is-primary">
                  {{ tag.category.name }}
                </b-tag>
              </div>
            </b-field>
          </b-table-column>

          <!-- <b-table-column field="time" label="Time" centered v-slot="props">
            {{ props.row.time }}
          </b-table-column> -->

          <b-table-column
            field="total_amount"
            label="Total Amount"
            centered
            v-slot="props"
          >
            {{
              toPrice(
                props.row.amount *
                  props.row.context[0].value *
                  (state.context.duration - props.row.time)
              ).toFormat()
            }}
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { useMachine } from "@xstate/vue";
import Dinero from "dinero.js";
import {
  moneyCategories,
  expectedFinancesMachine,
} from "@/machines/expectedFinancesCalc.machine";
import IncomeStreams from "@/components/ExpectedFinances/IncomeStreams/IncomeStreams.vue";
import Expenses from "@/components/ExpectedFinances/Expenses/Expenses.vue";
import FutureExpenses from "@/components/ExpectedFinances/FutureExpenses/FutureExpenses.vue";
import Savings from "@/components/ExpectedFinances/Savings/Savings.vue"

// Passive is once monthly
// Income is twices monthly
//  there can be a setting to set this for income
// Expenses are monthly

// Features
// Info cards on when credit or loans are paid off
//  when this happens, that money is added to Snowball Savings category

// This has to be reactive, so any data that is entered is automatically inserted into the machine
// How are we sending that information

// Make it so that you can save a calculation and data and pull them up later
//  this would make it extremely marketable in case someone wanted to try another budget without
//  making changes to a previous one

// const newItem = {
//   name: "",
//   context: [], // tags
//   amount: 0,
//   time: 0, // this will default to the set amount unless filled in
//   apply: false,
// };

export default {
  name: "ExpectedFinance",
  components: { IncomeStreams, Expenses, FutureExpenses, Savings },
  setup() {
    const { state, send, service } = useMachine(expectedFinancesMachine, {
      devTools: true,
    });

    return {
      state,
      send,
      service,
    };
  },
  data() {
    // What variable do we need and how do we set up the multiselect system
    // Apply or do not apply: This is in the form element for each item
    // What sections/tabs are we doing

    return {
      // joinedData: this.combinedData ?? [],

      filteredTags: moneyCategories,
      isSelectOnly: false,
      tags: [],
      allowNew: false,
      openOnFocus: false,
      duration: this.state.context.duration,

      checkboxPosition: "left",
      columns: [
        {
          field: "name",
          label: "Name",
          numeric: false,
        },
        {
          field: "amount",
          label: "Amount",
          numeric: true,
        },
        {
          field: "context",
          label: "Context",
          numeric: false,
        },
        {
          field: "time",
          label: "Time",
          numeric: true,
        },
      ],

      isOpen: false,
      // data: [],
      expenses: [],
      // duration: null,
    };
  },
  computed: {
    combinedData() {
      return this.state.context.incomeStreams.concat(
        this.state.context.expenses
      );
    },
  },
  watch: {
    duration(newDuration) {
      this.send({ type: "UPDATE_DURATION", value: newDuration });
    },
  },
  methods: {
    toPrice(amount, factor = Math.pow(10, 2)) {
      return Dinero({ amount: Math.round(amount * factor) }).setLocale(
        this.language
      );
    },
  },
};
</script>

<style>
</style>