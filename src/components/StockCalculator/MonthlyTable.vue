<template>
  <div class="monthly-table">
    <h3 class="title is-5">Monthly Breakdown</h3>
    <b-table
      :data="paginatedData"
      :striped="true"
      :hoverable="true"
      :paginated="true"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="false"
      :sticky-header="true"
      height="500px"
    >
      <b-table-column field="month" label="Month" v-slot="props" numeric>
        {{ props.row.month }}
      </b-table-column>

      <b-table-column field="year" label="Year" v-slot="props" numeric>
        {{ props.row.year }}
      </b-table-column>

      <b-table-column
        v-if="data[0] && data[0].monthOfYear !== undefined"
        field="monthOfYear"
        label="Month of Year"
        v-slot="props"
        numeric
      >
        {{ getMonthName(props.row.monthOfYear) }}
      </b-table-column>

      <b-table-column field="portfolioValue" label="Portfolio Value" v-slot="props" numeric>
        ${{ formatNumber(props.row.portfolioValue) }}
      </b-table-column>

      <b-table-column field="totalInvested" label="Total Invested" v-slot="props" numeric>
        ${{ formatNumber(props.row.totalInvested) }}
      </b-table-column>

      <b-table-column
        v-if="data[0] && data[0].dividendsReceived !== undefined"
        field="dividendsReceived"
        label="Monthly Dividends"
        v-slot="props"
        numeric
      >
        ${{ formatNumber(props.row.dividendsReceived) }}
      </b-table-column>

      <b-table-column field="totalDividends" label="Total Dividends" v-slot="props" numeric>
        ${{ formatNumber(props.row.totalDividends) }}
      </b-table-column>

      <b-table-column field="totalReturn" label="Total Return" v-slot="props" numeric>
        ${{ formatNumber(props.row.totalReturn) }}
      </b-table-column>

      <b-table-column field="returnPercentage" label="Return %" v-slot="props" numeric>
        <span :class="getReturnClass(props.row.returnPercentage)">
          {{ props.row.returnPercentage }}%
        </span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'MonthlyTable',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 12
    };
  },
  computed: {
    paginatedData() {
      return this.data;
    }
  },
  methods: {
    formatNumber(value) {
      if (value === undefined || value === null) return '0.00';
      return parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    getReturnClass(percentage) {
      const value = parseFloat(percentage);
      if (value > 0) return 'has-text-success';
      if (value < 0) return 'has-text-danger';
      return '';
    },
    getMonthName(monthNumber) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[monthNumber - 1] || monthNumber;
    }
  }
};
</script>

<style scoped>
.monthly-table {
  margin-top: 20px;
}
</style>
