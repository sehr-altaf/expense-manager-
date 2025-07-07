
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    const fetchTotals = async () => {
      const incomeSnap = await getDocs(collection(db, 'income'));
      const income = incomeSnap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);

      const expenseSnap = await getDocs(collection(db, 'expenses'));
      const expenses = expenseSnap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);

      setIncomeTotal(income);
      setExpenseTotal(expenses);
    };
    fetchTotals();
  }, []);

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#36A2EB', '#FF6384'],
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Income vs Expense</h2>
      <Pie data={data} />
    </div>
  );
}

export default Home;
