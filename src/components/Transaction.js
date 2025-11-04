import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = Math.abs(num).toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

// Date formatter function
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <div className="transaction-content">
        <div className="transaction-main">
          <span className="transaction-text">{transaction.text}</span>
          <span className="transaction-amount">{sign}{moneyFormatter(transaction.amount)}</span>
        </div>
        <div className="transaction-details">
          {transaction.category && <span className="transaction-category">{transaction.category}</span>}
          {transaction.date && <span className="transaction-date">{formatDate(transaction.date)}</span>}
        </div>
        {transaction.notes && (
          <div className="transaction-notes">{transaction.notes}</div>
        )}
      </div>
      <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
    </li>
  )
}
