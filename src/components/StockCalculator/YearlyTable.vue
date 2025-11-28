<template>
  <div class="yearly-table">
    <h3 class="title is-5">Yearly Breakdown</h3>
    <b-table
      :data="data"
      :striped="true"
      :hoverable="true"
      :sticky-header="true"
      height="500px"
    >
      <b-table-column field="year" label="Year" v-slot="props" numeric>
        {{ props.row.year }}
      </b-table-column>

      <b-table-column field="portfolioValue" label="Portfolio Value" v-slot="props" numeric>
        ${{ formatNumber(props.row.portfolioValue) }}
      </b-table-column>

      <b-table-column field="totalInvested" label="Total Invested" v-slot="props" numeric>
        ${{ formatNumber(props.row.totalInvested) }}
      </b-table-column>

      <b-table-column
        v-if="data[0] && data[0].yearlyDividends !== undefined"
        field="yearlyDividends"
        label="Yearly Dividends"
        v-slot="props"
        numeric
      >
        ${{ formatNumber(props.row.yearlyDividends) }}
      </b-table-column>

      <b-table-column field="totalDividends" label="Total Dividends" v-slot="props" numeric>
        ${{ formatNumber(props.row.totalDividends) }}
      </b-table-column>

      <b-table-column
        v-if="data[0] && data[0].annualDividendYield !== undefined"
        field="annualDividendYield"
        label="Dividend Yield"
        v-slot="props"
        numeric
      >
        {{ props.row.annualDividendYield }}%
      </b-table-column>

      <b-table-column field="totalReturn" label="Total Return" v-slot="props" numeric>
        ${{ formatNumber(props.row.totalReturn) }}
      </b-table-column>

      <b-table-column field="returnPercentage" label="Return %" v-slot="props" numeric>
        <span :class="getReturnClass(props.row.returnPercentage)">
          {{ props.row.returnPercentage }}%
        </span>
      </b-table-column>

      <!-- Additional columns for comparison data -->
      <template v-if="isComparisonData">
        <b-table-column
          v-for="stock in comparisonStocks"
          :key="stock + '_value'"
          :field="stock + '_value'"
          :label="stock + ' Value'"
          v-slot="props"
          numeric
        >
          ${{ formatNumber(props.row[stock + '_value']) }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'YearlyTable',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    isComparisonData() {
      if (this.data.length === 0) return false;
      const firstRow = this.data[0];
      return Object.keys(firstRow).some(key => key.includes('_value'));
    },
    comparisonStocks() {
      if (!this.isComparisonData || this.data.length === 0) return [];
      const firstRow = this.data[0];
      return Object.keys(firstRow)
        .filter(key => key.endsWith('_value'))
        .map(key => key.replace('_value', ''));
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
    }
  }
};
</script>

<style scoped>
.yearly-table {
  margin-top: 20px;
}
</style>
