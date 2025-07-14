import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, 'transactions'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setTransactions(data);
      setFilteredTransactions(data);
    };
    fetchData();
  }, []);

  const applyFilters = () => {
    let data = [...transactions];
    if (startDate && endDate) {
      const sd = new Date(startDate), ed = new Date(endDate);
      data = data.filter(tx =>
        new Date(tx.date) >= sd && new Date(tx.date) <= ed
      );
    }
    if (searchText) {
      const s = searchText.toLowerCase();
      data = data.filter(tx =>
        tx.category?.toLowerCase().includes(s) ||
        tx.note?.toLowerCase().includes(s) ||
        tx.title?.toLowerCase().includes(s)
      );
    }
    setFilteredTransactions(data);
  };

  const pieData = Object.values(
    filteredTransactions
      .filter(tx => tx.type === 'Expense')
      .reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
        return acc;
      }, {})
  ).map((value, idx, arr) => ({
    name: Object.keys(
      filteredTransactions
        .filter(tx => tx.type === 'Expense')
        .reduce((a, tx) => {
          a[tx.category] = (a[tx.category] || 0) + Number(tx.amount);
          return a;
        }, {})
    )[idx] || `Category ${idx + 1}`,
    value
  }));

  const lineData = filteredTransactions
    .reduce((map, tx) => {
      const date = tx.date;
      if (!map[date]) map[date] = { date, Income: 0, Expense: 0 };
      map[date][tx.type] += Number(tx.amount);
      return map;
    }, {});

  const sortedLineData = Object.values(lineData).sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="dashboard-container">
      <h2>Date Range Filter for Transactions</h2>

      <div className="date-filter-box">
        <div>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <button onClick={applyFilters}>Search</button>
      </div>

      <div className="or-label">OR</div>

      <div className="text-search-box">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button onClick={applyFilters}>Search</button>
      </div>

      <div className="stats-cards">
        <div className="card">
          <p>Total Income</p>
          <h3>${filteredTransactions.reduce((sum, tx) => tx.type === 'Income' ? sum + Number(tx.amount) : sum, 0)}</h3>
        </div>
        <div className="card">
          <p>Total Expense</p>
          <h3>${filteredTransactions.reduce((sum, tx) => tx.type === 'Expense' ? sum + Number(tx.amount) : sum, 0)}</h3>
        </div>
        <div className="card">
          <p>Balance</p>
          <h3>${filteredTransactions.reduce((sum, tx) =>
            tx.type === 'Income' ? sum + Number(tx.amount) : sum - Number(tx.amount)
          , 0)}</h3>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h4>Expense By Category</h4>
          <PieChart width={350} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={100} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][i % 4]} />
              ))}
            </Pie>
            <ReTooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="chart">
          <h4>Income vs Expense</h4>
          <LineChart data={sortedLineData} width={500} height={300} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <ReTooltip />
            <Legend />
            <Line type="monotone" dataKey="Income" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Expense" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
