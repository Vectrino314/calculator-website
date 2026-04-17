# Stock Investment Calculator

A comprehensive stock investment calculator with compound interest projections, dividend growth analysis, and portfolio mixing capabilities.

## Features

### 📊 Single Stock Calculator
- Analyze individual stock performance with compound interest
- Support for 10+ popular dividend ETFs (SCHD, JEPQ, JEPI, VYM, DGRO, VIG, QYLD, VOO, SPY, SCHG)
- Customizable investment parameters (initial investment, monthly contributions, time period)
- Dividend reinvestment options
- Real-time calculations with dividend growth rates

### 🎯 Portfolio Mixing
- Combine multiple stocks with percentage allocations
- Example: 70% SCHD + 30% JEPQ
- Up to 10 stocks in a single portfolio
- Visual breakdown of allocation with pie charts
- Combined performance metrics

### ⚖️ Stock Comparison
- Compare up to 5 stocks side-by-side
- Identify best and worst performers
- Same investment parameters across all stocks
- Visual comparison with line charts

### 📈 Visualizations
- Interactive growth charts showing portfolio value over time
- Allocation pie charts for portfolio mixing
- Comparison line charts for multiple stocks
- Responsive and mobile-friendly

### 📑 Detailed Data Tables
- Monthly breakdown with pagination
- Yearly summary tables
- Exportable data showing:
  - Portfolio value
  - Total invested
  - Dividends received
  - Total returns
  - Return percentage

## Stock Data Included

The calculator includes realistic data for popular dividend ETFs:

| Symbol | Name | Dividend Yield | Dividend Growth | Price Appreciation |
|--------|------|----------------|-----------------|-------------------|
| SCHD | Schwab U.S. Dividend Equity ETF | 3.5% | 10.5% | 11.2% |
| JEPQ | JPMorgan Nasdaq Equity Premium Income ETF | 9.2% | 2.0% | 8.5% |
| JEPI | JPMorgan Equity Premium Income ETF | 7.5% | 2.5% | 7.8% |
| VYM | Vanguard High Dividend Yield ETF | 2.8% | 7.5% | 10.5% |
| DGRO | iShares Core Dividend Growth ETF | 2.3% | 11.0% | 12.3% |
| VIG | Vanguard Dividend Appreciation ETF | 1.9% | 9.5% | 11.8% |
| QYLD | Global X NASDAQ 100 Covered Call ETF | 11.5% | 0.5% | 4.2% |
| VOO | Vanguard S&P 500 ETF | 1.5% | 8.0% | 13.5% |
| SPY | SPDR S&P 500 ETF Trust | 1.4% | 8.2% | 13.6% |
| SCHG | Schwab U.S. Large-Cap Growth ETF | 0.6% | 12.0% | 15.8% |

## Technology Stack

- **Frontend**: Vue.js 2
- **UI Framework**: Buefy (Bulma components)
- **Charts**: Chart.js 3.9
- **State Management**: XState
- **Financial Calculations**: Dinero.js
- **Build Tool**: Vue CLI 4

## Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn serve

# Build for production
NODE_OPTIONS=--openssl-legacy-provider yarn build

# Lint and fix files
yarn lint
```

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is through Vercel's GitHub integration:

1. Push your code to GitHub (already done!)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository: `Vectrino314/calculator-website`
4. Select the branch: `claude/stock-calculator-projections-01MNpfXaet4Ng9FY8HTho23a`
5. Vercel will auto-detect the Vue.js project
6. Click "Deploy"

The `vercel.json` file is already configured with the correct build settings.

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Usage

### Single Stock Analysis

1. Navigate to the "Single Stock" tab
2. Select a stock from the dropdown
3. Enter your investment parameters:
   - Initial investment amount
   - Monthly contribution
   - Investment period (years)
   - Choose whether to reinvest dividends
4. Click "Calculate Projections"
5. View the results in charts and tables

### Portfolio Mixing

1. Navigate to the "Portfolio Mix" tab
2. Add stocks and set allocation percentages (must total 100%)
3. Enter investment parameters
4. Click "Calculate Portfolio Projections"
5. View combined performance and individual stock contributions

### Stock Comparison

1. Navigate to the "Compare Stocks" tab
2. Select 2-5 stocks to compare
3. Enter investment parameters (same for all stocks)
4. Click "Compare Stocks"
5. View side-by-side comparison with performance metrics

## Calculation Methodology

The calculator uses realistic compound interest formulas:

- **Monthly calculations** for precision
- **Compound dividend growth** based on historical rates
- **Price appreciation** applied monthly
- **Dividend reinvestment** (optional) automatically purchases more shares
- **Share price growth** affects both principal and dividend values

## Disclaimer

This calculator is for educational and informational purposes only. The stock data and projections are based on historical averages and do not guarantee future performance. Always consult with a financial advisor before making investment decisions.

## License

See [LICENSE.md](LICENSE.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
