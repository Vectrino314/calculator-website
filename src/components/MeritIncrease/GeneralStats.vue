<template>
  <nav class="level">
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Final Result</p>
      <p class="title">{{ finalResult }}</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">% Change</p>
      <p class="title">{{ getPercentageIncrease() }} %</p>
    </div>
  </div>
</nav>
</template>

<script>
import Dinero from "dinero.js";

export default {
    name: "GeneralStats",
    props: {
      finalResult: Number,
      initalAmount: Number,
    },
    // data() {
    //   return {
    //     result: this.finalResult,
    //     initAmount: this.initalAmount
    //   }
    // },
    methods: {
      getPercentageIncrease() {
        console.log(Dinero(this.finalResult).getAmount())
        console.log(this.initalAmount)
        console.log(this.finalResult - 1)
        return this.finalResult / this.initalAmount;
      }
    }
};
</script>

<style>
</style>