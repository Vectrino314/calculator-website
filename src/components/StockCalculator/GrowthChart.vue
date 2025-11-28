<template>
  <div class="growth-chart">
    <h3 class="title is-5">Portfolio Growth Over Time</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'GrowthChart',
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
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          plugins: {
            title: {
              display: false
            },
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += '$' + context.parsed.y.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    });
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
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
.growth-chart {
  padding: 20px;
  background-color: white;
  border-radius: 6px;
}
</style>
