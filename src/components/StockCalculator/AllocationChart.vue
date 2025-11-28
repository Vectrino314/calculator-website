<template>
  <div class="allocation-chart">
    <h3 class="title is-5">Portfolio Allocation (Final Value)</h3>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'AllocationChart',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart();
      },
      deep: true
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.chartCanvas.getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          plugins: {
            legend: {
              display: true,
              position: 'right'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(2);

                  return `${label}: $${value.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.allocation-chart {
  padding: 20px;
  background-color: white;
  border-radius: 6px;
}

.chart-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
