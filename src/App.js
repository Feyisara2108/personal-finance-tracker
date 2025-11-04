import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { CategoryManager } from './components/CategoryManager';
import { CSVExport } from './components/CSVExport';
import { Charts } from './components/Charts';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <div className="header-actions">
          <CSVExport />
        </div>
        <Balance />
        <IncomeExpenses />
        <Charts />
        <CategoryManager />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
