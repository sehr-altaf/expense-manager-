
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import '../../index.css';



function IncomeList() {
  const [entry, setEntry] = useState({ date: '', description: '', amount: '' });
  const [incomeData, setIncomeData] = useState([]);

  const handleChange = (e) => setEntry({ ...entry, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.date || !entry.description || !entry.amount) return;
    await addDoc(collection(db, 'income'), {
      ...entry,
      amount: parseFloat(entry.amount),
    });
    setEntry({ date: '', description: '', amount: '' });
    fetchData();
  };

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, 'income'));
    const data = snapshot.docs.map(doc => doc.data());
    setIncomeData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Income</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={entry.date} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={entry.description} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={entry.amount} onChange={handleChange} required />
        <button type="submit"> Add</button>
      
      </form>
      

      <table border="1" width="100%" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr><th>Date</th><th>Description</th><th>Amount</th></tr>
        </thead>
        <tbody>
          {incomeData.map((item, i) => (
            <tr key={i}>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeList;
