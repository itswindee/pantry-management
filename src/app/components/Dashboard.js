// a dhasboard to show pantry statistics and trends

// components/Dashboard.js
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [expiringSoon, setExpiringSoon] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const querySnapshot = await getDocs(collection(db, 'pantryItems'));
      const itemsData = querySnapshot.docs.map(doc => doc.data());
      setTotalItems(itemsData.length);
      setExpiringSoon(itemsData.filter(item => {
        const today = new Date();
        const expDate = new Date(item.expirationDate);
        return (expDate - today) / (1000 * 60 * 60 * 24) <= 7; // 7 days
      }).length);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Items: {totalItems}</p>
      <p>Expiring Soon: {expiringSoon}</p>
    </div>
  );
};

export default Dashboard;
