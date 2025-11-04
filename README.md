# Personal Finance Tracker

A comprehensive React.js application for tracking personal finances, enabling users to monitor and analyze their income and expenses with advanced categorization and filtering options.

## Features

### Core Functionality

- **Input Forms**: Record income and expenses with complete transaction details:
  - Transaction type (Income/Expense)
  - Description
  - Amount
  - Date
  - Category selection
  - Optional notes

- **Custom Categorization**: 
  - Create, view, and manage custom income and expense categories
  - Separate category management for income and expense types
  - Delete categories (existing transactions remain intact)

- **Transaction Management**:
  - **Sorting**: Sort transactions by:
    - Date (newest/oldest first)
    - Amount (highest/lowest)
    - Category (alphabetical)
    - Description (alphabetical)
  - **Filtering**: Filter transactions by:
    - Type (All/Income/Expense)
    - Category
    - Date range (From/To dates)

- **Visual Analytics**:
  - Income vs Expense comparison chart
  - Expenses by category breakdown
  - Income by category breakdown
  - Interactive bar charts for category analysis

- **CSV Export**: 
  - Export all transactions to CSV format
  - Includes all transaction details (Date, Type, Description, Category, Amount, Notes)
  - Ready for import into spreadsheet applications

- **Data Persistence**: 
  - All data is automatically saved to browser's localStorage
  - Transactions and categories persist across browser sessions
  - No data loss on page refresh

- **Responsive Design**:
  - Optimized for desktop, tablet, and mobile devices
  - Adaptive layouts for various screen sizes
  - Touch-friendly interface elements

## Technology Stack

- **React.js** - Frontend framework
- **React Context API** - State management
- **localStorage** - Browser storage for data persistence
- **CSS3** - Styling with responsive design
- **JavaScript ES6+** - Modern JavaScript features

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone or download the project repository

2. Navigate to the project directory:
```bash
cd personal-finance-tracker
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production

To create a production build:

```bash
npm run build
```

The optimized build will be in the `build` folder, ready for deployment.

## How to Use the Application

### Adding a Transaction

1. Scroll to the "Add new transaction" section
2. Select the transaction type (Income or Expense)
3. Enter a description for the transaction
4. Enter the amount (positive number)
5. Select or enter a date
6. Choose a category from the dropdown (or create a new one first)
7. Optionally add notes
8. Click "Add transaction"

### Managing Categories

1. Click the "Manage Categories" button
2. To add a category:
   - Select category type (Income or Expense)
   - Enter the category name
   - Click "Add Category"
3. To delete a category:
   - Find the category in the list
   - Click the "×" button next to it
   - Note: Deleting a category does not delete transactions using that category

### Filtering and Sorting Transactions

1. In the "Transaction History" section, use the filter controls:
   - **Sort By**: Choose how to sort transactions (Date, Amount, Category, Description)
   - Click the sort order button (↑/↓) to toggle ascending/descending
   - **Type**: Filter by All, Income, or Expense
   - **Category**: Filter by specific category
   - **From Date/To Date**: Filter by date range
2. Click "Clear Filters" to reset all filters

### Viewing Charts

The application automatically displays:
- **Income vs Expense**: Visual comparison of total income and expenses
- **Expenses by Category**: Breakdown of expenses by category
- **Income by Category**: Breakdown of income by category

Charts update automatically as you add or modify transactions.

### Exporting Data

1. Click the "Export to CSV" button in the top-right corner
2. A CSV file will be downloaded with all your transactions
3. Open the file in Excel, Google Sheets, or any spreadsheet application

### Deleting Transactions

1. Hover over a transaction in the history list
2. Click the "×" button that appears on the right
3. The transaction will be permanently removed

## Data Storage

All data is stored locally in your browser's localStorage:
- **Transactions**: Stored under the key `transactions`
- **Income Categories**: Stored under the key `incomeCategories`
- **Expense Categories**: Stored under the key `expenseCategories`

**Important Notes**:
- Data is browser-specific (data in Chrome won't appear in Firefox)
- Clearing browser data will delete all transactions
- For backup, regularly export your data using the CSV export feature

## Project Structure

```
personal-finance-tracker/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddTransaction.js
│   │   ├── Balance.js
│   │   ├── CategoryManager.js
│   │   ├── Charts.js
│   │   ├── CSVExport.js
│   │   ├── Header.js
│   │   ├── IncomeExpenses.js
│   │   ├── Transaction.js
│   │   └── TransactionList.js
│   ├── context/
│   │   ├── AppReducer.js
│   │   └── GlobalState.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Browser Compatibility

This application works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features Checklist

✅ Input Forms with all required fields (amount, date, category, notes)  
✅ Custom income and expense categories  
✅ Transaction sorting (by date, category, amount, description)  
✅ Transaction filtering (by date, category, type)  
✅ CSV export functionality  
✅ Browser storage persistence (localStorage)  
✅ Responsive design for various devices  
✅ Visual charts for income vs expense data  
✅ Comprehensive README documentation  

## Future Enhancements

Potential features for future versions:
- Edit existing transactions
- Recurring transactions
- Budget setting and tracking
- Multiple currency support
- Data import from CSV
- Cloud backup integration
- Spending trends and predictions
- Monthly/yearly reports

## License

This project is open source and available for personal and educational use.

## Support

For issues, questions, or contributions, please refer to the project repository.

---

**Happy Tracking!** 📊💰
