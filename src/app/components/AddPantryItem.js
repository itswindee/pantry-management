// a component for adding new pantry items

// components/AddPantryItem.js
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

const AddPantryItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const addItem = async () => {
    try {
      await addDoc(collection(db, 'pantryItems'), {
        name,
        quantity: Number(quantity),
        expirationDate
      });
      setName('');
      setQuantity('');
      setExpirationDate('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <input
        type="date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default AddPantryItem;
