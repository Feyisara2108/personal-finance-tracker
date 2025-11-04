import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const CategoryManager = () => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('expense');
  const [showManager, setShowManager] = useState(false);

  const {
    incomeCategories,
    expenseCategories,
    addIncomeCategory,
    addExpenseCategory,
    deleteIncomeCategory,
    deleteExpenseCategory
  } = useContext(GlobalContext);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    const category = {
      id: Date.now(),
      name: newCategoryName.trim()
    };

    if (categoryType === 'income') {
      // Check if category already exists
      if (incomeCategories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
        alert('This category already exists');
        return;
      }
      addIncomeCategory(category);
    } else {
      // Check if category already exists
      if (expenseCategories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
        alert('This category already exists');
        return;
      }
      addExpenseCategory(category);
    }

    setNewCategoryName('');
  };

  const handleDeleteCategory = (id, type) => {
    if (window.confirm('Are you sure you want to delete this category? This will not delete transactions using this category.')) {
      if (type === 'income') {
        deleteIncomeCategory(id);
      } else {
        deleteExpenseCategory(id);
      }
    }
  };

  return (
    <div className="category-manager">
      <button 
        className="btn btn-secondary" 
        onClick={() => setShowManager(!showManager)}
        style={{ marginBottom: '10px' }}
      >
        {showManager ? 'Hide' : 'Manage Categories'}
      </button>

      {showManager && (
        <div className="category-manager-content">
          <h4>Manage Categories</h4>
          
          <form onSubmit={handleAddCategory} className="category-form">
            <div className="form-control">
              <label htmlFor="category-type">Category Type</label>
              <select
                id="category-type"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="form-select"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="new-category">New Category Name</label>
              <input
                id="new-category"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name..."
                required
              />
            </div>
            <button type="submit" className="btn btn-small">Add Category</button>
          </form>

          <div className="categories-list">
            <div className="categories-section">
              <h5>Expense Categories</h5>
              <ul>
                {expenseCategories.map(cat => (
                  <li key={cat.id}>
                    <span>{cat.name}</span>
                    <button
                      className="btn-delete-category"
                      onClick={() => handleDeleteCategory(cat.id, 'expense')}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="categories-section">
              <h5>Income Categories</h5>
              <ul>
                {incomeCategories.map(cat => (
                  <li key={cat.id}>
                    <span>{cat.name}</span>
                    <button
                      className="btn-delete-category"
                      onClick={() => handleDeleteCategory(cat.id, 'income')}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

