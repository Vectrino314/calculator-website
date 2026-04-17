<template>
  <div class="stock-comparison">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <h3 class="title is-5">Select Stocks to Compare</h3>

          <b-field label="Select Stocks (up to 5)">
            <b-taginput
              v-model="selectedStocks"
              :data="filteredStocks"
              autocomplete
              :allow-new="false"
              field="symbol"
              icon="label"
              placeholder="Add a stock"
              :maxtags="5"
              @typing="getFilteredStocks"
            >
              <template slot-scope="props">
                {{ props.option.symbol }} - {{ props.option.name }}
              </template>
              <template slot="selected" slot-scope="props">
                <b-tag
                  v-for="(stock, index) in props.tags"
                  :key="index"
                  type="is-primary"
                  closable
                  @close="$refs.taginput.removeTag(index, $event)"
                >
                  {{ stock.symbol }}
                </b-tag>
              </template>
            </b-taginput>
          </b-field>

          <div v-if="selectedStocks.length > 0" class="selected-stocks mt-4">
            <h4 class="title is-6">Selected Stocks:</h4>
            <div v-for="stock in selectedStocks" :key="stock.symbol" class="stock-card mb-3">
              <strong>{{ stock.symbol }}</strong> - {{ stock.name }}
              <div class="stock-metrics">
                <span>Div: {{ stock.dividendYield }}%</span> |
                <span>Growth: {{ stock.priceAppreciation }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h3 class="title is-5">Investment Parameters</h3>

          <b-field label="Initial Investment ($)">
            <b-input
              v-model.number="initialInvestment"
              type="number"
              min="0"
              step="100"
              placeholder="10000"
            ></b-input>
          </b-field>

          <b-field label="Monthly Contribution ($)">
            <b-input
              v-model.number="monthlyContribution"
              type="number"
              min="0"
              step="50"
              placeholder="500"
            ></b-input>
          </b-field>

          <b-field label="Investment Period (Years)">
            <b-input
              v-model.number="years"
              type="number"
              min="1"
              max="50"
              placeholder="10"
            ></b-input>
          </b-field>

          <b-field label="Reinvest Dividends">
            <b-switch v-model="reinvestDividends">
              {{ reinvestDividends ? 'Yes' : 'No' }}
            </b-switch>
          </b-field>

          <b-button
            type="is-primary"
            expanded
            @click="calculate"
            :disabled="!canCalculate"
          >
            Compare Stocks
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateComparison } from './calculationUtils.js';

export default {
  name: 'StockComparison',
  data() {
    return {
      stocks: [
        {
          symbol: 'SCHD',
          name: 'Schwab U.S. Dividend Equity ETF',
          dividendYield: 3.5,
          dividendGrowth: 10.5,
          priceAppreciation: 11.2
        },
        {
          symbol: 'JEPQ',
          name: 'JPMorgan Nasdaq Equity Premium Income ETF',
          dividendYield: 9.2,
          dividendGrowth: 2.0,
          priceAppreciation: 8.5
        },
        {
          symbol: 'JEPI',
          name: 'JPMorgan Equity Premium Income ETF',
          dividendYield: 7.5,
          dividendGrowth: 2.5,
          priceAppreciation: 7.8
        },
        {
          symbol: 'VYM',
          name: 'Vanguard High Dividend Yield ETF',
          dividendYield: 2.8,
          dividendGrowth: 7.5,
          priceAppreciation: 10.5
        },
        {
          symbol: 'DGRO',
          name: 'iShares Core Dividend Growth ETF',
          dividendYield: 2.3,
          dividendGrowth: 11.0,
          priceAppreciation: 12.3
        },
        {
          symbol: 'VIG',
          name: 'Vanguard Dividend Appreciation ETF',
          dividendYield: 1.9,
          dividendGrowth: 9.5,
          priceAppreciation: 11.8
        },
        {
          symbol: 'QYLD',
          name: 'Global X NASDAQ 100 Covered Call ETF',
          dividendYield: 11.5,
          dividendGrowth: 0.5,
          priceAppreciation: 4.2
        },
        {
          symbol: 'VOO',
          name: 'Vanguard S&P 500 ETF',
          dividendYield: 1.5,
          dividendGrowth: 8.0,
          priceAppreciation: 13.5
        },
        {
          symbol: 'SPY',
          name: 'SPDR S&P 500 ETF Trust',
          dividendYield: 1.4,
          dividendGrowth: 8.2,
          priceAppreciation: 13.6
        },
        {
          symbol: 'SCHG',
          name: 'Schwab U.S. Large-Cap Growth ETF',
          dividendYield: 0.6,
          dividendGrowth: 12.0,
          priceAppreciation: 15.8
        }
      ],
      selectedStocks: [],
      filteredStocks: [],
      initialInvestment: 10000,
      monthlyContribution: 500,
      years: 10,
      reinvestDividends: true
    };
  },
  computed: {
    canCalculate() {
      return this.selectedStocks.length >= 2 && this.initialInvestment > 0 && this.years > 0;
    }
  },
  mounted() {
    this.filteredStocks = this.stocks;
    // Default comparison: SCHD vs JEPQ
    this.selectedStocks = [this.stocks[0], this.stocks[1]];
  },
  methods: {
    getFilteredStocks(text) {
      this.filteredStocks = this.stocks.filter((stock) => {
        return (
          stock.symbol.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
          stock.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      });
    },
    calculate() {
      const projection = calculateComparison({
        stocks: this.selectedStocks,
        initialInvestment: this.initialInvestment,
        monthlyContribution: this.monthlyContribution,
        years: this.years,
        reinvestDividends: this.reinvestDividends
      });

      this.$emit('calculate', projection);
    }
  }
};
</script>

<style scoped>
.stock-card {
  background-color: #f0f9ff;
  padding: 12px;
  border-radius: 6px;
  border-left: 3px solid #3273dc;
}

.stock-metrics {
  font-size: 0.9em;
  color: #666;
  margin-top: 5px;
}

.selected-stocks {
  max-height: 300px;
  overflow-y: auto;
}
</style>
