<template>
  <div class="stock-calculator">
    <div class="container">
      <h1 class="title has-text-centered">Stock Investment Calculator</h1>
      <p class="subtitle has-text-centered">Project your investment growth with dividends and compound interest</p>

      <b-tabs v-model="activeTab" type="is-boxed" :animated="false">
        <!-- Single Stock Tab -->
        <b-tab-item label="Single Stock" icon="chart-line">
          <single-stock-calculator
            @calculate="handleSingleStockCalculation"
          ></single-stock-calculator>
        </b-tab-item>

        <!-- Portfolio Mix Tab -->
        <b-tab-item label="Portfolio Mix" icon="layer-group">
          <portfolio-calculator
            @calculate="handlePortfolioCalculation"
          ></portfolio-calculator>
        </b-tab-item>

        <!-- Compare Stocks Tab -->
        <b-tab-item label="Compare Stocks" icon="balance-scale">
          <stock-comparison
            @calculate="handleComparisonCalculation"
          ></stock-comparison>
        </b-tab-item>
      </b-tabs>

      <!-- Results Section -->
      <div v-if="calculationResults" class="results-section box mt-5">
        <h2 class="title is-4">Investment Projections</h2>

        <!-- Summary Cards -->
        <summary-cards :results="calculationResults"></summary-cards>

        <!-- Charts -->
        <div class="columns mt-4">
          <div class="column is-12">
            <growth-chart :chartData="chartData"></growth-chart>
          </div>
        </div>

        <div class="columns mt-4" v-if="activeTab === 1 || activeTab === 2">
          <div class="column is-12">
            <allocation-chart :chartData="allocationData" v-if="allocationData"></allocation-chart>
          </div>
        </div>

        <!-- Data Tables -->
        <div class="mt-5">
          <b-tabs v-model="activeTableTab" type="is-toggle">
            <b-tab-item label="Yearly Breakdown">
              <yearly-table :data="yearlyData"></yearly-table>
            </b-tab-item>
            <b-tab-item label="Monthly Breakdown">
              <monthly-table :data="monthlyData"></monthly-table>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleStockCalculator from './SingleStockCalculator.vue';
import PortfolioCalculator from './PortfolioCalculator.vue';
import StockComparison from './StockComparison.vue';
import SummaryCards from './SummaryCards.vue';
import GrowthChart from './GrowthChart.vue';
import AllocationChart from './AllocationChart.vue';
import YearlyTable from './YearlyTable.vue';
import MonthlyTable from './MonthlyTable.vue';

export default {
  name: 'StockCalculator',
  components: {
    SingleStockCalculator,
    PortfolioCalculator,
    StockComparison,
    SummaryCards,
    GrowthChart,
    AllocationChart,
    YearlyTable,
    MonthlyTable
  },
  data() {
    return {
      activeTab: 0,
      activeTableTab: 0,
      calculationResults: null,
      chartData: null,
      allocationData: null,
      yearlyData: [],
      monthlyData: []
    };
  },
  methods: {
    handleSingleStockCalculation(data) {
      this.calculationResults = data.results;
      this.chartData = data.chartData;
      this.allocationData = null;
      this.yearlyData = data.yearlyData;
      this.monthlyData = data.monthlyData;
    },
    handlePortfolioCalculation(data) {
      this.calculationResults = data.results;
      this.chartData = data.chartData;
      this.allocationData = data.allocationData;
      this.yearlyData = data.yearlyData;
      this.monthlyData = data.monthlyData;
    },
    handleComparisonCalculation(data) {
      this.calculationResults = data.results;
      this.chartData = data.chartData;
      this.allocationData = data.allocationData;
      this.yearlyData = data.yearlyData;
      this.monthlyData = data.monthlyData;
    }
  }
};
</script>

<style scoped>
.stock-calculator {
  padding: 20px;
}

.results-section {
  background-color: #f9f9f9;
}

.container {
  max-width: 1400px;
}
</style>
