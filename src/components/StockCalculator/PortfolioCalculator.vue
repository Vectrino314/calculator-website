<template>
  <div class="portfolio-calculator">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <h3 class="title is-5">Portfolio Allocation</h3>

          <div v-for="(allocation, index) in allocations" :key="index" class="allocation-item mb-4">
            <div class="columns is-mobile">
              <div class="column is-6">
                <b-field :label="`Stock ${index + 1}`">
                  <b-select v-model="allocation.stock" placeholder="Select stock" expanded>
                    <option v-for="stock in stocks" :value="stock" :key="stock.symbol">
                      {{ stock.symbol }}
                    </option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Allocation %">
                  <b-input
                    v-model.number="allocation.percentage"
                    type="number"
                    min="0"
                    max="100"
                    @input="validateAllocations"
                  ></b-input>
                </b-field>
              </div>
              <div class="column is-2">
                <b-field label=" ">
                  <b-button
                    type="is-danger"
                    icon-left="trash"
                    @click="removeAllocation(index)"
                    :disabled="allocations.length === 1"
                  ></b-button>
                </b-field>
              </div>
            </div>

            <div v-if="allocation.stock" class="stock-info-mini">
              Div Yield: {{ allocation.stock.dividendYield }}% |
              Growth: {{ allocation.stock.priceAppreciation }}%
            </div>
          </div>

          <b-button
            type="is-info"
            icon-left="plus"
            @click="addAllocation"
            :disabled="allocations.length >= 10"
            expanded
          >
            Add Stock
          </b-button>

          <div class="mt-3" :class="{'has-text-danger': totalAllocation !== 100, 'has-text-success': totalAllocation === 100}">
            <strong>Total Allocation: {{ totalAllocation }}%</strong>
            <span v-if="totalAllocation !== 100"> (Must equal 100%)</span>
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
            Calculate Portfolio Projections
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculatePortfolioProjection } from './calculationUtils.js';

export default {
  name: 'PortfolioCalculator',
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
      allocations: [
        { stock: null, percentage: 70 },
        { stock: null, percentage: 30 }
      ],
      initialInvestment: 10000,
      monthlyContribution: 500,
      years: 10,
      reinvestDividends: true
    };
  },
  computed: {
    totalAllocation() {
      return this.allocations.reduce((sum, a) => sum + (a.percentage || 0), 0);
    },
    canCalculate() {
      const allStocksSelected = this.allocations.every(a => a.stock !== null);
      const validAllocation = this.totalAllocation === 100;
      const validInputs = this.initialInvestment > 0 && this.years > 0;
      return allStocksSelected && validAllocation && validInputs;
    }
  },
  mounted() {
    // Default allocation: 70% SCHD, 30% JEPQ
    this.allocations[0].stock = this.stocks[0]; // SCHD
    this.allocations[1].stock = this.stocks[1]; // JEPQ
  },
  methods: {
    addAllocation() {
      this.allocations.push({ stock: null, percentage: 0 });
    },
    removeAllocation(index) {
      this.allocations.splice(index, 1);
      this.validateAllocations();
    },
    validateAllocations() {
      // Just trigger reactivity
      this.$forceUpdate();
    },
    calculate() {
      const projection = calculatePortfolioProjection({
        allocations: this.allocations,
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
.allocation-item {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.stock-info-mini {
  font-size: 0.85em;
  color: #666;
  margin-top: -10px;
}
</style>
