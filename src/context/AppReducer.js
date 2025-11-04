export default (state, action) => {
  switch(action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    case 'ADD_INCOME_CATEGORY':
      return {
        ...state,
        incomeCategories: [...state.incomeCategories, action.payload]
      }
    case 'ADD_EXPENSE_CATEGORY':
      return {
        ...state,
        expenseCategories: [...state.expenseCategories, action.payload]
      }
    case 'DELETE_INCOME_CATEGORY':
      return {
        ...state,
        incomeCategories: state.incomeCategories.filter(cat => cat.id !== action.payload)
      }
    case 'DELETE_EXPENSE_CATEGORY':
      return {
        ...state,
        expenseCategories: state.expenseCategories.filter(cat => cat.id !== action.payload)
      }
    default:
      return state;
  }
}