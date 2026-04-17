<template>
  <div class="single-stock-calculator">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <h3 class="title is-5">Select Stock</h3>

          <b-field label="Stock">
            <b-select v-model="selectedStock" placeholder="Select a stock" expanded @input="onStockChange">
              <option
                v-for="stock in stocks"
                :value="stock"
                :key="stock.symbol">
                {{ stock.symbol }} - {{ stock.name }}
              </option>
            </b-select>
          </b-field>

          <div v-if="selectedStock" class="stock-info mt-4">
            <p><strong>Dividend Yield:</strong> {{ selectedStock.dividendYield }}%</p>
            <p><strong>Dividend Growth Rate:</strong> {{ selectedStock.dividendGrowth }}% annually</p>
            <p><strong>Price Appreciation:</strong> {{ selectedStock.priceAppreciation }}% annually</p>
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
            Calculate Projections
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateStockProjection } from './calculationUtils.js';

export default {
  name: 'SingleStockCalculator',
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
      selectedStock: null,
      initialInvestment: 10000,
      monthlyContribution: 500,
      years: 10,
      reinvestDividends: true
    };
  },
  computed: {
    canCalculate() {
      return this.selectedStock && this.initialInvestment > 0 && this.years > 0;
    }
  },
  mounted() {
    // Default to SCHD
    this.selectedStock = this.stocks[0];
  },
  methods: {
    onStockChange() {
      // Stock changed, could trigger auto-calculation if needed
    },
    calculate() {
      const projection = calculateStockProjection({
        stock: this.selectedStock,
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
.stock-info {
  background-color: #f0f9ff;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #3273dc;
}

.stock-info p {
  margin-bottom: 8px;
}
</style>
