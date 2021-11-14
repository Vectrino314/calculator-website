<template>
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
    <title>Hello Bulma!</title>
<!--    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">-->
  </head>
  <body>
  <section class="section">
    <!-- <MeritIncrease></MeritIncrease> -->
    <ExpectedFinance></ExpectedFinance>
<!--    <b-table :data="data" :columns="columns"></b-table>-->
<!--    <div class="container">-->
<!--      <h1 class="title">-->
<!--        Hello World-->
<!--      </h1>-->
<!--      <p class="subtitle">-->
<!--        My first website with <strong>Bulma</strong>!-->
<!--      </p>-->
<!--    </div>-->
  </section>
  </body>
  </html>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import CalculatorTable from "@/components/CalculatorTable";

// import MeritIncrease from "@/components/MeritIncrease/MeritIncrease.vue";
import ExpectedFinance from "@/components/ExpectedFinances/ExpectedFinance";

export default {
  name: 'App',
  components: {
    // MeritIncrease,
    ExpectedFinance
    // CalculatorTable,
    // HelloWorld
  },
  data() {
    return {
      data: [
        { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
        { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
        { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
        { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
        { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'First Name',
        },
        {
          field: 'last_name',
          label: 'Last Name',
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender',
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
