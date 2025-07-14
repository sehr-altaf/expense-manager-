import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { Navigate , useNavigate} from 'react-router-dom';
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

  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-transaction');
  };

  return (
    <div style={{ padding: '20px' }}>
         <div>
      <button type="button" onClick={handleClick}>
        New Transactions
      </button>
    </div>
      <h2>All Transactions</h2>

      

     
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

<<<<<<< HEAD
      <h3 style={{ marginTop: '20px' }}>Total Balance: ₹{total.toFixed(2)}</h3>
          </div>
=======
      <h3 style={{ marginTop: '20px' }}>Total Balance:{total.toFixed(2)}</h3>
    </div>
>>>>>>> 66292eb (project added)
  );
}

export default TransactionList;
