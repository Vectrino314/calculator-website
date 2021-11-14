<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add New Savings Source</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            placeholder="New Expense Source"
            type="string"
            v-model="saving.name"
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
            v-model="saving.amount"
          >
          </b-input>
        </b-field>

        <b-field>
          <b-taginput
            v-model="saving.context"
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
          <b-input placeholder="Time" type="number" v-model="saving.time">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          expanded
          label="Submit"
          type="is-primary"
          @click="$emit('submit', saving)"
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

const savingsCategories = [
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
  name: "AddSavingsModal",
  props: ["savings"],
  data() {
    return {
      // incomeStream: this.incomeStreams,
      filteredTags: savingsCategories,
      isSelectOnly: false,
      tags: [],
      allowNew: false,
      openOnFocus: false,

      saving: {
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
      this.filteredTags = savingsCategories.filter((option) => {
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