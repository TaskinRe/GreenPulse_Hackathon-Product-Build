import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [co2, setCo2] = useState(0);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null); 

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const p = await AsyncStorage.getItem('points');
      const c = await AsyncStorage.getItem('co2');
      const h = await AsyncStorage.getItem('history');
      if(p) setPoints(parseInt(p));
      if(c) setCo2(parseFloat(c));
      if(h) setHistory(JSON.parse(h));
    } catch (e) {}
  };

  const login = (name) => setUser({ name, id: '784-2024-1234567-1' });

  const addTransaction = async (type, amount, co2Value) => {
    const newPoints = points + amount;
    const newCo2 = co2 + co2Value;
    const newEntry = { id: Date.now(), type, points: amount, date: new Date().toLocaleDateString(), location: 'Smart Bin #42' };
    
    setPoints(newPoints);
    setCo2(newCo2);
    setHistory([newEntry, ...history]);
    
    await AsyncStorage.setItem('points', newPoints.toString());
    await AsyncStorage.setItem('co2', newCo2.toString());
    await AsyncStorage.setItem('history', JSON.stringify([newEntry, ...history]));
  };

  const redeemPoints = async (cost) => {
    if (points >= cost) {
      const newPoints = points - cost;
      setPoints(newPoints);
      await AsyncStorage.setItem('points', newPoints.toString());
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ user, points, co2, history, login, addTransaction, redeemPoints }}>
      {children}
    </UserContext.Provider>
  );
};