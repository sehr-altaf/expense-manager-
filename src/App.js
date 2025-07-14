import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/pages/Dashboard';
import IncomeList from './components/pages/IncomeList'
import ExpenseList from './components/pages/ExpenseList'
import TransactionList from './components/pages/TransactionList'
import NewTransaction from './components/pages/NewTransaction';
import Navbar from './components/Navbar';
import Categories from './components/pages/Categories';
import NewCatagory from './components/pages/NewCatagory';




function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar/>
        <Navbar/>
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/income" element={<IncomeList/>} />
            <Route path="/expense" element={<ExpenseList/>} />
            <Route path="/transaction" element={<TransactionList/>} />
             <Route path="/Categories" element={<Categories/>} />
            <Route path="/new-transaction" element={<NewTransaction/>}/>
            <Route path='new-category' element={<NewCatagory/>}/>
          </Routes>
        </div>
       
      </div>  
    </Router>
  );
}

export default App;
