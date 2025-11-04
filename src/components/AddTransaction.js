import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [transactionType, setTransactionType] = useState('expense');

  const { addTransaction, incomeCategories, expenseCategories } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    if (!text.trim() || !amount || !date || !category) {
      alert('Please fill in all required fields (Text, Amount, Date, Category)');
      return;
    }

    const amountValue = transactionType === 'expense' ? -Math.abs(+amount) : Math.abs(+amount);

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: amountValue,
      date,
      category,
      notes: notes.trim(),
      type: transactionType
    }

    addTransaction(newTransaction);
    
    // Reset form
    setText('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('');
    setNotes('');
  }

  const availableCategories = transactionType === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="form-section">
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="type">Transaction Type</label>
          <select 
            id="type" 
            value={transactionType} 
            onChange={(e) => {
              setTransactionType(e.target.value);
              setCategory(''); // Reset category when type changes
            }}
            className="form-select"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input 
            type="text" 
            id="text"
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter description..." 
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input 
            type="number" 
            id="amount"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Enter amount..." 
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date"
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select 
            id="category"
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            {availableCategories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea 
            id="notes"
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Enter optional notes..." 
            rows="3"
            className="form-textarea"
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  )
}
