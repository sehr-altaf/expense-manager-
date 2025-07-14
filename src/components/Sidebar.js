import React from 'react';
import { Link } from 'react-router-dom';



function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        {/* <li><Link to="/income">IncomeList</Link></li>
        <li><Link to="/expense">ExpenseList</Link></li> */}
        <li><Link to="/transaction">Transactions</Link></li>
        <li><Link to= "/Categories">Categories</Link></li>

      </ul>
    </div>
  );
}

export default Sidebar;
