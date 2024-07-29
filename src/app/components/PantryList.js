// a component to display the list of pantry items

// components/PantryList.js
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const PantryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'pantryItems'));
      const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  const updateItemQuantity = async (id, quantity) => {
    try {
      await updateDoc(doc(db, 'pantryItems', id), { quantity: Number(quantity) });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name} - {item.quantity} - {item.expirationDate}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateItemQuantity(item.id, e.target.value)}
          />
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PantryList;
