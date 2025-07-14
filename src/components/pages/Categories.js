
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

function Categories() {
  const [form, setForm] = useState({ name: '', type: 'income' });
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, 'categories', editId), form);
        setEditId(null);
      } else {
        await addDoc(collection(db, 'categories'), form);
      }
      setForm({ name: '', type: 'income' });
      fetchCategories();
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleEdit = category => {
    setForm({ name: category.name, type: category.type });
    setEditId(category.id);
  };

  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-category');
  };
  
  return(
    <div className="category-container">
         <div>
      <button type="button" onClick={handleClick}>
        New Categories
      </button>
    </div>
      <h2>Manage Categories</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          name="name"
          placeholder="Category name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">{editId ? 'Update' : 'Add'} Category</button>
      </form>

      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.type}</td>
              <td>
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
