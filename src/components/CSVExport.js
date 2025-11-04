import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const CSVExport = () => {
  const { transactions } = useContext(GlobalContext);

  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert('No transactions to export');
      return;
    }

    // CSV Headers
    const headers = ['Date', 'Type', 'Description', 'Category', 'Amount', 'Notes'];
    
    // Convert transactions to CSV rows
    const csvRows = [
      headers.join(','),
      ...transactions.map(transaction => {
        const type = transaction.amount >= 0 ? 'Income' : 'Expense';
        const amount = Math.abs(transaction.amount).toFixed(2);
        const date = transaction.date || '';
        const text = `"${(transaction.text || '').replace(/"/g, '""')}"`;
        const category = transaction.category || '';
        const notes = `"${(transaction.notes || '').replace(/"/g, '""')}"`;
        
        return [date, type, text, category, amount, notes].join(',');
      })
    ];

    // Create CSV content
    const csvContent = csvRows.join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="btn btn-export" onClick={exportToCSV}>
      Export to CSV
    </button>
  );
};

