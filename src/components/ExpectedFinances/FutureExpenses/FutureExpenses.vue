<template>
  <div>
    <div expanded class="block" style="text-align: right">
      <b-button @click="cardModal()">
        <span class="icon" style="margin-right: .25rem">
          <i class="fas fa-plus " aria-hidden="true"></i> </span
        >Add New Future Expense
      </b-button>
    </div>

    <b-table :data="state.context.futureExpenses" :bordered="true" :striped="true">
      <!-- <b-table-column field="id" label="ID" width="40" v-slot="props" numeric>
        {{ props.row.id }}
      </b-table-column> -->

      <b-table-column field="name" label="Name" v-slot="props">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column field="amount" label="Amount" centered v-slot="props">
        {{ toPrice(props.row.amount).toFormat() }}
      </b-table-column>

      <b-table-column field="context" label="Context" v-slot="props">
        <b-field grouped group-multiline>
          <div v-for="tag in props.row.context" :key="tag.id" class="control">
            <b-tag type="is-primary">
              {{ tag.category.name }}
            </b-tag>
          </div>
        </b-field>
      </b-table-column>

      <b-table-column field="time" label="Time" centered v-slot="props">
        {{ props.row.time }}
      </b-table-column>

      <b-table-column field="actions" label="Actions" centered v-slot="props">
        <button @click="send({ type: 'EDIT_FUTURE', value: props.row.id })">
          Edit
        </button>
        <button @click="send({ type: 'DELETE_FUTURE', value: props.row })">
          Delete
        </button>
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { useService } from "@xstate/vue";
import Dinero from "dinero.js";
import AddFutureExpenseModal from "./AddFutureExpenseModal.vue";

export default {
  name: "FutureExpenses",
  props: ["machine"],
  setup(props) {
    const { state, send } = useService(props.machine);

    return {
      state,
      send,
    };
  },
  data() {
    return {
      filteredTags: [],
      isSelectOnly: false,
      tags: [],
      allowNew: false,
      openOnFocus: false,

      machineSrv: this.machine,
    };
  },
  // mounted() {
  //   if (localStorage.expenses) {
  //     this.expenses = localStorage.expenses;
  //   }
  // },
  // watch: {
  //   expenses(newExpenses) {
  //     localStorage.expenses = newExpenses;
  //   }
  // },
  methods: {
    toPrice(amount, factor = Math.pow(10, 2)) {
      return Dinero({ amount: Math.round(amount * factor) }).setLocale(
        this.language
      );
    },
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AddFutureExpenseModal,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        events: {
          submit: (value) => {
            console.log(value);

            this.send({ type: "ADD_FUTURE", value: value });

            // window.localStorage.setItem('expenses', this.expenses);
          },
        },
      });
    },
  },
};
</script>

<style>
</style>