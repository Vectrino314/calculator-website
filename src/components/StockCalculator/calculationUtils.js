/**
 * Calculate stock investment projection with compound interest and dividend growth
 */
export function calculateStockProjection({
  stock,
  initialInvestment,
  monthlyContribution,
  years,
  reinvestDividends
}) {
  const months = years * 12;
  const monthlyData = [];
  const yearlyData = [];

  let totalInvested = initialInvestment;
  let shares = initialInvestment / 100; // Assuming $100 per share initially
  let sharePrice = 100;
  let annualDividendPerShare = sharePrice * (stock.dividendYield / 100);
  let totalDividendsReceived = 0;

  // Monthly calculations
  for (let month = 1; month <= months; month++) {
    // Add monthly contribution
    if (month > 1) {
      totalInvested += monthlyContribution;
      const additionalShares = monthlyContribution / sharePrice;
      shares += additionalShares;
    }

    // Calculate dividends (paid monthly, based on annual yield)
    const monthlyDividend = (shares * annualDividendPerShare) / 12;
    totalDividendsReceived += monthlyDividend;

    // Reinvest dividends if enabled
    if (reinvestDividends && monthlyDividend > 0) {
      const dividendShares = monthlyDividend / sharePrice;
      shares += dividendShares;
    }

    // Update share price based on monthly appreciation
    const monthlyPriceGrowth = stock.priceAppreciation / 100 / 12;
    sharePrice = sharePrice * (1 + monthlyPriceGrowth);

    // Update dividend per share based on dividend growth
    const monthlyDividendGrowth = stock.dividendGrowth / 100 / 12;
    annualDividendPerShare = annualDividendPerShare * (1 + monthlyDividendGrowth);

    // Calculate portfolio value
    const portfolioValue = shares * sharePrice;
    const totalReturn = portfolioValue - totalInvested + (reinvestDividends ? 0 : totalDividendsReceived);
    const returnPercentage = (totalReturn / totalInvested) * 100;

    monthlyData.push({
      month,
      year: Math.floor((month - 1) / 12) + 1,
      monthOfYear: ((month - 1) % 12) + 1,
      shares: shares.toFixed(4),
      sharePrice: sharePrice.toFixed(2),
      portfolioValue: portfolioValue.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      dividendsReceived: monthlyDividend.toFixed(2),
      totalDividends: totalDividendsReceived.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      returnPercentage: returnPercentage.toFixed(2)
    });

    // Add to yearly data at end of each year
    if (month % 12 === 0 || month === months) {
      const yearNumber = Math.ceil(month / 12);
      const yearDividends = monthlyData
        .filter(m => m.year === yearNumber)
        .reduce((sum, m) => sum + parseFloat(m.dividendsReceived), 0);

      yearlyData.push({
        year: yearNumber,
        shares: shares.toFixed(4),
        sharePrice: sharePrice.toFixed(2),
        portfolioValue: portfolioValue.toFixed(2),
        totalInvested: totalInvested.toFixed(2),
        yearlyDividends: yearDividends.toFixed(2),
        totalDividends: totalDividendsReceived.toFixed(2),
        totalReturn: totalReturn.toFixed(2),
        returnPercentage: returnPercentage.toFixed(2),
        annualDividendYield: ((yearDividends / portfolioValue) * 100).toFixed(2)
      });
    }
  }

  const finalData = monthlyData[monthlyData.length - 1];
  const finalValue = parseFloat(finalData.portfolioValue);
  const totalInvestedAmount = parseFloat(finalData.totalInvested);
  const totalDividends = parseFloat(finalData.totalDividends);
  const totalGains = finalValue - totalInvestedAmount + (reinvestDividends ? 0 : totalDividends);

  return {
    results: {
      stock: stock.symbol,
      finalValue,
      totalInvested: totalInvestedAmount,
      totalDividends,
      totalGains,
      totalReturn: (totalGains / totalInvestedAmount) * 100,
      shares: parseFloat(finalData.shares),
      finalSharePrice: parseFloat(finalData.sharePrice),
      reinvestedDividends: reinvestDividends
    },
    chartData: prepareChartData(monthlyData, yearlyData),
    monthlyData,
    yearlyData
  };
}

/**
 * Calculate portfolio projection with multiple stocks
 */
export function calculatePortfolioProjection({
  allocations, // Array of {stock, percentage}
  initialInvestment,
  monthlyContribution,
  years,
  reinvestDividends
}) {
  const portfolioResults = allocations.map(allocation => {
    const stockInitial = initialInvestment * (allocation.percentage / 100);
    const stockMonthly = monthlyContribution * (allocation.percentage / 100);

    const projection = calculateStockProjection({
      stock: allocation.stock,
      initialInvestment: stockInitial,
      monthlyContribution: stockMonthly,
      years,
      reinvestDividends
    });

    return {
      ...projection,
      allocation: allocation.percentage,
      symbol: allocation.stock.symbol
    };
  });

  // Combine portfolio data
  const months = years * 12;
  const monthlyData = [];
  const yearlyData = [];

  for (let month = 1; month <= months; month++) {
    let combinedValue = 0;
    let combinedInvested = 0;
    let combinedDividends = 0;
    let combinedTotalDividends = 0;

    portfolioResults.forEach(result => {
      const monthData = result.monthlyData[month - 1];
      combinedValue += parseFloat(monthData.portfolioValue);
      combinedInvested += parseFloat(monthData.totalInvested);
      combinedDividends += parseFloat(monthData.dividendsReceived);
      combinedTotalDividends += parseFloat(monthData.totalDividends);
    });

    const totalReturn = combinedValue - combinedInvested + (reinvestDividends ? 0 : combinedTotalDividends);

    monthlyData.push({
      month,
      year: Math.floor((month - 1) / 12) + 1,
      monthOfYear: ((month - 1) % 12) + 1,
      portfolioValue: combinedValue.toFixed(2),
      totalInvested: combinedInvested.toFixed(2),
      dividendsReceived: combinedDividends.toFixed(2),
      totalDividends: combinedTotalDividends.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      returnPercentage: ((totalReturn / combinedInvested) * 100).toFixed(2)
    });

    if (month % 12 === 0 || month === months) {
      const yearNumber = Math.ceil(month / 12);
      const yearDividends = monthlyData
        .filter(m => m.year === yearNumber)
        .reduce((sum, m) => sum + parseFloat(m.dividendsReceived), 0);

      yearlyData.push({
        year: yearNumber,
        portfolioValue: combinedValue.toFixed(2),
        totalInvested: combinedInvested.toFixed(2),
        yearlyDividends: yearDividends.toFixed(2),
        totalDividends: combinedTotalDividends.toFixed(2),
        totalReturn: totalReturn.toFixed(2),
        returnPercentage: ((totalReturn / combinedInvested) * 100).toFixed(2),
        annualDividendYield: ((yearDividends / combinedValue) * 100).toFixed(2)
      });
    }
  }

  const finalData = monthlyData[monthlyData.length - 1];
  const finalValue = parseFloat(finalData.portfolioValue);
  const totalInvestedAmount = parseFloat(finalData.totalInvested);
  const totalDividends = parseFloat(finalData.totalDividends);
  const totalGains = finalValue - totalInvestedAmount + (reinvestDividends ? 0 : totalDividends);

  return {
    results: {
      portfolio: allocations.map(a => `${a.stock.symbol} (${a.percentage}%)`).join(', '),
      finalValue,
      totalInvested: totalInvestedAmount,
      totalDividends,
      totalGains,
      totalReturn: (totalGains / totalInvestedAmount) * 100,
      reinvestedDividends: reinvestDividends
    },
    chartData: preparePortfolioChartData(monthlyData, yearlyData, portfolioResults),
    allocationData: prepareAllocationChartData(portfolioResults, allocations),
    monthlyData,
    yearlyData,
    portfolioResults
  };
}

/**
 * Calculate comparison between multiple stocks
 */
export function calculateComparison({
  stocks, // Array of stock objects
  initialInvestment,
  monthlyContribution,
  years,
  reinvestDividends
}) {
  const comparisons = stocks.map(stock => {
    return calculateStockProjection({
      stock,
      initialInvestment,
      monthlyContribution,
      years,
      reinvestDividends
    });
  });

  // Prepare combined chart data
  const chartData = prepareComparisonChartData(comparisons, stocks);

  // Create combined yearly data for table
  const yearlyData = [];
  for (let year = 1; year <= years; year++) {
    const yearData = { year };
    comparisons.forEach((comp, idx) => {
      const stock = stocks[idx];
      const yearEntry = comp.yearlyData.find(y => y.year === year);
      if (yearEntry) {
        yearData[`${stock.symbol}_value`] = yearEntry.portfolioValue;
        yearData[`${stock.symbol}_dividends`] = yearEntry.totalDividends;
        yearData[`${stock.symbol}_return`] = yearEntry.returnPercentage;
      }
    });
    yearlyData.push(yearData);
  }

  // Create monthly data similarly
  const monthlyData = [];
  for (let month = 1; month <= years * 12; month++) {
    const monthData = { month, year: Math.floor((month - 1) / 12) + 1 };
    comparisons.forEach((comp, idx) => {
      const stock = stocks[idx];
      const monthEntry = comp.monthlyData[month - 1];
      if (monthEntry) {
        monthData[`${stock.symbol}_value`] = monthEntry.portfolioValue;
        monthData[`${stock.symbol}_dividends`] = monthEntry.totalDividends;
      }
    });
    monthlyData.push(monthData);
  }

  // Results summary
  const results = {
    comparisons: comparisons.map((comp, idx) => ({
      stock: stocks[idx].symbol,
      finalValue: comp.results.finalValue,
      totalReturn: comp.results.totalReturn,
      totalDividends: comp.results.totalDividends
    })),
    bestPerformer: null,
    worstPerformer: null
  };

  // Find best and worst
  let maxReturn = -Infinity;
  let minReturn = Infinity;
  results.comparisons.forEach(comp => {
    if (comp.totalReturn > maxReturn) {
      maxReturn = comp.totalReturn;
      results.bestPerformer = comp.stock;
    }
    if (comp.totalReturn < minReturn) {
      minReturn = comp.totalReturn;
      results.worstPerformer = comp.stock;
    }
  });

  return {
    results,
    chartData,
    allocationData: null,
    yearlyData,
    monthlyData,
    comparisons
  };
}

/**
 * Prepare chart data for single stock
 */
function prepareChartData(monthlyData, yearlyData) {
  return {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Portfolio Value',
        data: yearlyData.map(d => parseFloat(d.portfolioValue)),
        borderColor: '#3273dc',
        backgroundColor: 'rgba(50, 115, 220, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Total Invested',
        data: yearlyData.map(d => parseFloat(d.totalInvested)),
        borderColor: '#48c774',
        backgroundColor: 'rgba(72, 199, 116, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Total Dividends',
        data: yearlyData.map(d => parseFloat(d.totalDividends)),
        borderColor: '#ffdd57',
        backgroundColor: 'rgba(255, 221, 87, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };
}

/**
 * Prepare chart data for portfolio
 */
function preparePortfolioChartData(monthlyData, yearlyData, portfolioResults) {
  const datasets = [
    {
      label: 'Total Portfolio Value',
      data: yearlyData.map(d => parseFloat(d.portfolioValue)),
      borderColor: '#3273dc',
      backgroundColor: 'rgba(50, 115, 220, 0.1)',
      fill: true,
      tension: 0.4
    },
    {
      label: 'Total Invested',
      data: yearlyData.map(d => parseFloat(d.totalInvested)),
      borderColor: '#48c774',
      backgroundColor: 'rgba(72, 199, 116, 0.1)',
      fill: true,
      tension: 0.4
    }
  ];

  // Add individual stock values
  const colors = ['#ff3860', '#ffdd57', '#9b59b6', '#e67e22', '#1abc9c'];
  portfolioResults.forEach((result, idx) => {
    datasets.push({
      label: `${result.symbol} Value`,
      data: result.yearlyData.map(d => parseFloat(d.portfolioValue)),
      borderColor: colors[idx % colors.length],
      backgroundColor: `${colors[idx % colors.length]}20`,
      fill: false,
      tension: 0.4,
      borderDash: [5, 5]
    });
  });

  return {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets
  };
}

/**
 * Prepare allocation pie chart data
 */
function prepareAllocationChartData(portfolioResults, allocations) {
  const finalValues = portfolioResults.map(result =>
    parseFloat(result.monthlyData[result.monthlyData.length - 1].portfolioValue)
  );

  const colors = ['#3273dc', '#ff3860', '#ffdd57', '#48c774', '#9b59b6', '#e67e22', '#1abc9c'];

  return {
    labels: allocations.map(a => a.stock.symbol),
    datasets: [{
      data: finalValues,
      backgroundColor: colors.slice(0, allocations.length),
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
}

/**
 * Prepare comparison chart data
 */
function prepareComparisonChartData(comparisons, stocks) {
  const colors = ['#3273dc', '#ff3860', '#ffdd57', '#48c774', '#9b59b6', '#e67e22', '#1abc9c'];

  const datasets = comparisons.map((comp, idx) => ({
    label: stocks[idx].symbol,
    data: comp.yearlyData.map(d => parseFloat(d.portfolioValue)),
    borderColor: colors[idx % colors.length],
    backgroundColor: `${colors[idx % colors.length]}20`,
    fill: false,
    tension: 0.4
  }));

  return {
    labels: comparisons[0].yearlyData.map(d => `Year ${d.year}`),
    datasets
  };
}
