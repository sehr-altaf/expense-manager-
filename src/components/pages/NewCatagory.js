import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './NewCategory.css'; 

function NewCategory() {
  const [form, setForm] = useState({
    type: 'Expense',
    title: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type) => {
    setForm({ ...form, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'categories'), form);
      navigate('/');
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  return (
    <div className="category-page">
      <div className="form-section">
        <h2>Create a New Category</h2>
        <div className="type-switch">
          <button
            type="button"
            className={form.type === 'Expense' ? 'active' : ''}
            onClick={() => handleTypeChange('Expense')}
          >
            Expense
          </button>
          <button
            type="button"
            className={form.type === 'Income' ? 'active' : ''}
            onClick={() => handleTypeChange('Income')}
          >
            Income
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          {/* Removed Icon Field */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="image-section">
        {/* <img
          src="https://cdn.pixabay.com/photo/2021/02/11/09/14/financial-6004551_1280.png"
          alt="Category illustration"
        /> */}
      </div>
    </div>
  );
}

export default NewCategory;
