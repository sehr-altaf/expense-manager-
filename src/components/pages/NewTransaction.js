import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
// import expensespic from '../../assets/expensespic.png';



function NewTransaction() {
  const [form, setForm] = useState({
    date: '',
    category: '',
    amount: '',
    note: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'transactions'), form);
      console.log('Transaction added with ID: ', docRef.id);
      navigate('/');
    } catch (error) {
      console.error('Error adding transaction: ', error);
    }
  };

  return (
    <div className="transaction-page">
      <div className="form-section">
        <h2>Add New Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date:</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div>
            <label>Category:</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} required />
          </div>
          <div>
            <label>Amount:</label>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
          </div>
          <div>
            <label>Note:</label>
            <textarea name="note" value={form.note} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="image-section">
        {/* <img
      src={expensespic} alt="Financial transaction illustration" /> */}

  
      </div>
    </div>
  );
}

export default NewTransaction;
