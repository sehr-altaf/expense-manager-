import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

function TransactionList() {
  const [entry, setEntry] = useState({ date: '', type: '', description: '', amount: '' });
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setEntry({ ...entry, [e.target.name]: e.target.value });

  const fetchTransactions = async () => {
    const snapshot = await getDocs(collection(db, 'transactions'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(entry.amount);

    if (editId) {
      const docRef = doc(db, 'transactions', editId);
      await updateDoc(docRef, { ...entry, amount: parsedAmount });
      setEditId(null);
    } else {
      await addDoc(collection(db, 'transactions'), { ...entry, amount: parsedAmount });
    }

    setEntry({ date: '', type: '', description: '', amount: '' });
    fetchTransactions();
  };

  const handleEdit = (trans) => {
    setEntry({
      date: trans.date,
      type: trans.type,
      description: trans.description,
      amount: trans.amount
    });
    setEditId(trans.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'transactions', id));
    fetchTransactions();
  };

  const total = transactions.reduce((sum, item) => {
    return item.type === 'Income' ? sum + item.amount : sum - item.amount;
  }, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Transactions</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input type="date" name="date" value={entry.date} onChange={handleChange} required />
        <select name="type" value={entry.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input type="text" name="description" placeholder="Description" value={entry.description} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={entry.amount} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.type}</td>
              <td>{t.description}</td>
              <td>{t.amount}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '20px' }}>Total Balance: ₹{total.toFixed(2)}</h3>
    </div>
  );
}

export default TransactionList;
