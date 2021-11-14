<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add New Expense Source</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            placeholder="New Expense Source"
            type="string"
            v-model="expense.name"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Amount">
          <p class="control">
            <span class="button is-static">$</span>
          </p>
          <b-input
            placeholder="Amount"
            expanded
            type="number"
            v-model="expense.amount"
          >
          </b-input>
        </b-field>

        <b-field>
          <b-taginput
            v-model="expense.context"
            :data="filteredTags"
            autocomplete
            :allow-new="allowNew"
            :open-on-focus="openOnFocus"
            field="category.name"
            placeholder="Add Context"
            @typing="getFilteredTags"
          >
          </b-taginput>
          <template #label>
            <div class="columns">
              <span class="column">Context</span>
              <b-field class="column align-right">
                <b-tag>
                  Press the
                  <span class="icon">
                    <i class="fas fa-arrow-down" aria-hidden="true"></i>
                  </span>
                  arrow
                </b-tag>
              </b-field>
            </div>
          </template>
        </b-field>

        <!-- <b-field grouped group-multiline>
          <div v-for="tag of expense.context" :key="tag.id" class="control">
            <b-tag
              type="is-primary"
              attached
              aria-close-label="Close tag"
              closable
            >
              {{ tag.category.name }}
            </b-tag>
          </div>
        </b-field> -->
        <!-- <b-taglist>
          <b-tag v-for="tag of filteredTags" :key="tag.id" type="is-info">{{tag.category.name}}</b-tag>
        </b-taglist> -->

        <b-field label="Time Deferred (months)">
          <b-input placeholder="Time" type="number" v-model="expense.time">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          expanded
          label="Submit"
          type="is-primary"
          @click="$emit('submit', expense)"
        />
      </footer>
    </div>
  </form>
</template>

<script>
// const newItem = {
//   name: "",
//   context: [], // tags
//   amount: 0,
//   time: 0, // this will default to the set amount unless filled in
//   apply: false,
// };

const expenseCategories = [
  {
    id: 1,
    category: { name: "Expense" },
    value: -1, // This is the number of times that it is added per month
  },
  {
    id: 2,
    category: { name: "Credit" },
    value: -1, // This is the number of times that it is added per month
  },
  {
    id: 3,
    category: { name: "Subscription" },
    value: -1, // This is the number of times that it is added per month
  },
  {
    id: 4,
    category: { name: "Loan" },
    value: -1, // This is the number of times that it is added per month
  },
  {
    id: 5,
    category: { name: "Bill" },
    value: -1, // This is the number of times that it is added per month
  },
];

export default {
  name: "AddExpenseModal",
  props: ["expenses"],
  data() {
    return {
      // incomeStream: this.incomeStreams,
      filteredTags: expenseCategories,
      isSelectOnly: false,
      tags: [],
      allowNew: false,
      openOnFocus: false,

      expense: {
        name: "",
        context: [], // tags
        amount: 0,
        time: 0, // this will default to the set amount unless filled in
        apply: true,
      },
    };
  },
  methods: {
    // addNewIncome() {
    //   console.log("Something is happening");
    //   this.expenses.push({
    //     id: this.expenses.length + 1,
    //     newItem,
    //   });
    // },
    getFilteredTags(text) {
      this.filteredTags = expenseCategories.filter((option) => {
        return (
          option.category.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
  },
};
</script>

<style>
.align-right {
  text-align: right;
}
</style>