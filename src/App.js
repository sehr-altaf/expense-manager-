import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/pages/Home';
import IncomeList from './components/pages/IncomeList'
import ExpenseList from './components/pages/ExpenseList'
import TransactionList from './components/pages/TransactionList'
import Navbar from './components/Navbar';




function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar/>
        <Navbar/>
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/income" element={<IncomeList/>} />
            <Route path="/expense" element={<ExpenseList/>} />
            <Route path="/transaction" element={<TransactionList/>} />
          </Routes>
        </div>
       
      </div>  
    </Router>
  );
}

export default App;
