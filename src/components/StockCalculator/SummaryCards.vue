<template>
  <div class="summary-cards">
    <div class="columns is-multiline">
      <div class="column is-3">
        <div class="card summary-card">
          <div class="card-content">
            <p class="heading">Final Value</p>
            <p class="title is-4 has-text-primary">${{ formatNumber(results.finalValue) }}</p>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="card summary-card">
          <div class="card-content">
            <p class="heading">Total Invested</p>
            <p class="title is-4 has-text-info">${{ formatNumber(results.totalInvested) }}</p>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="card summary-card">
          <div class="card-content">
            <p class="heading">Total Gains</p>
            <p class="title is-4 has-text-success">${{ formatNumber(results.totalGains) }}</p>
            <p class="subtitle is-7">{{ results.totalReturn.toFixed(2) }}% return</p>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="card summary-card">
          <div class="card-content">
            <p class="heading">Total Dividends</p>
            <p class="title is-4 has-text-warning">${{ formatNumber(results.totalDividends) }}</p>
            <p class="subtitle is-7" v-if="!results.reinvestedDividends">(Paid out)</p>
            <p class="subtitle is-7" v-else>(Reinvested)</p>
          </div>
        </div>
      </div>

      <!-- Additional info for comparison -->
      <div v-if="results.comparisons" class="column is-12">
        <div class="card">
          <div class="card-content">
            <h4 class="title is-5">Comparison Results</h4>
            <div class="columns is-multiline">
              <div v-for="comp in results.comparisons" :key="comp.stock" class="column is-4">
                <div class="comparison-item">
                  <strong>{{ comp.stock }}</strong>
                  <div>Final Value: ${{ formatNumber(comp.finalValue) }}</div>
                  <div>Total Return: {{ comp.totalReturn.toFixed(2) }}%</div>
                  <div>Dividends: ${{ formatNumber(comp.totalDividends) }}</div>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <b-tag type="is-success" size="is-medium">
                Best Performer: {{ results.bestPerformer }}
              </b-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryCards',
  props: {
    results: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatNumber(value) {
      return parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
};
</script>

<style scoped>
.summary-card {
  height: 100%;
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comparison-item {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid #3273dc;
}

.comparison-item div {
  margin-top: 5px;
  font-size: 0.9em;
}
</style>
