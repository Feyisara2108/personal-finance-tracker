import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const savedTransactions = localStorage.getItem('transactions');
    const savedIncomeCategories = localStorage.getItem('incomeCategories');
    const savedExpenseCategories = localStorage.getItem('expenseCategories');
    
    const defaultIncomeCategories = [
      { id: 1, name: 'Salary' },
      { id: 2, name: 'Freelance' },
      { id: 3, name: 'Investment' },
      { id: 4, name: 'Gift' },
      { id: 5, name: 'Other' }
    ];
    
    const defaultExpenseCategories = [
      { id: 1, name: 'Food' },
      { id: 2, name: 'Transport' },
      { id: 3, name: 'Shopping' },
      { id: 4, name: 'Bills' },
      { id: 5, name: 'Entertainment' },
      { id: 6, name: 'Healthcare' },
      { id: 7, name: 'Other' }
    ];

    return {
      transactions: savedTransactions ? JSON.parse(savedTransactions) : [],
      incomeCategories: savedIncomeCategories ? JSON.parse(savedIncomeCategories) : defaultIncomeCategories,
      expenseCategories: savedExpenseCategories ? JSON.parse(savedExpenseCategories) : defaultExpenseCategories
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {
      transactions: [],
      incomeCategories: [
        { id: 1, name: 'Salary' },
        { id: 2, name: 'Freelance' },
        { id: 3, name: 'Investment' },
        { id: 4, name: 'Gift' },
        { id: 5, name: 'Other' }
      ],
      expenseCategories: [
        { id: 1, name: 'Food' },
        { id: 2, name: 'Transport' },
        { id: 3, name: 'Shopping' },
        { id: 4, name: 'Bills' },
        { id: 5, name: 'Entertainment' },
        { id: 6, name: 'Healthcare' },
        { id: 7, name: 'Other' }
      ]
    };
  }
};

// Initial state
const initialState = loadInitialState();

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
      localStorage.setItem('incomeCategories', JSON.stringify(state.incomeCategories));
      localStorage.setItem('expenseCategories', JSON.stringify(state.expenseCategories));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state.transactions, state.incomeCategories, state.expenseCategories]);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  function addIncomeCategory(category) {
    dispatch({
      type: 'ADD_INCOME_CATEGORY',
      payload: category
    });
  }

  function addExpenseCategory(category) {
    dispatch({
      type: 'ADD_EXPENSE_CATEGORY',
      payload: category
    });
  }

  function deleteIncomeCategory(id) {
    dispatch({
      type: 'DELETE_INCOME_CATEGORY',
      payload: id
    });
  }

  function deleteExpenseCategory(id) {
    dispatch({
      type: 'DELETE_EXPENSE_CATEGORY',
      payload: id
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    incomeCategories: state.incomeCategories,
    expenseCategories: state.expenseCategories,
    deleteTransaction,
    addTransaction,
    addIncomeCategory,
    addExpenseCategory,
    deleteIncomeCategory,
    deleteExpenseCategory
  }}>
    {children}
  </GlobalContext.Provider>);
}