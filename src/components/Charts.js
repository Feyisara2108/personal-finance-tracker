import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Charts = () => {
  const { transactions } = useContext(GlobalContext);

  const chartData = useMemo(() => {
    const income = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // Category breakdown for expenses
    const expenseByCategory = {};
    transactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        const category = t.category || 'Uncategorized';
        expenseByCategory[category] = (expenseByCategory[category] || 0) + Math.abs(t.amount);
      });

    // Category breakdown for income
    const incomeByCategory = {};
    transactions
      .filter(t => t.amount > 0)
      .forEach(t => {
        const category = t.category || 'Uncategorized';
        incomeByCategory[category] = (incomeByCategory[category] || 0) + t.amount;
      });

    return {
      income,
      expense,
      expenseByCategory,
      incomeByCategory,
      total: income - expense
    };
  }, [transactions]);

  const maxCategoryValue = Math.max(
    ...Object.values(chartData.expenseByCategory),
    ...Object.values(chartData.incomeByCategory),
    0
  );

  const renderBarChart = (data, color) => {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    
    if (entries.length === 0) {
      return <p className="no-data">No data available</p>;
    }

    return (
      <div className="bar-chart">
        {entries.map(([category, amount]) => {
          const percentage = maxCategoryValue > 0 ? (amount / maxCategoryValue) * 100 : 0;
          return (
            <div key={category} className="bar-item">
              <div className="bar-label">{category}</div>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                >
                  <span className="bar-value">${amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="charts-container">
      <h3>Financial Overview</h3>
      
      <div className="chart-section">
        <h4>Income vs Expense</h4>
        <div className="income-expense-chart">
          <div className="chart-bar-group">
            <div className="chart-label">Income</div>
            <div className="chart-bar-container">
              <div 
                className="chart-bar income-bar"
                style={{ 
                  width: chartData.income > 0 
                    ? `${(chartData.income / (chartData.income + chartData.expense)) * 100}%` 
                    : '0%' 
                }}
              >
                <span className="chart-bar-value">${chartData.income.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="chart-bar-group">
            <div className="chart-label">Expense</div>
            <div className="chart-bar-container">
              <div 
                className="chart-bar expense-bar"
                style={{ 
                  width: chartData.expense > 0 
                    ? `${(chartData.expense / (chartData.income + chartData.expense)) * 100}%` 
                    : '0%' 
                }}
              >
                <span className="chart-bar-value">${chartData.expense.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(chartData.expenseByCategory).length > 0 && (
        <div className="chart-section">
          <h4>Expenses by Category</h4>
          {renderBarChart(chartData.expenseByCategory, '#c0392b')}
        </div>
      )}

      {Object.keys(chartData.incomeByCategory).length > 0 && (
        <div className="chart-section">
          <h4>Income by Category</h4>
          {renderBarChart(chartData.incomeByCategory, '#2ecc71')}
        </div>
      )}
    </div>
  );
};

