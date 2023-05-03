import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [people, setPeople] = useState([
    {'Rahul': {amount: 10, date: '5/3/2023'}},
    { 'Anjali':  { amount: 20, date: '5/3/2023'}},
    { 'Jay':{amount: 30, date: '5/3/2023' }},
    { 'Tina': {amount: 40, date: '5/3/2023' }},
  ]);
  
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setButton] = useState(true);
  const [selectedNames, setSelectedNames] = useState([]);
  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState('');
  const [splitAmounts, setSplitAmounts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  
  const handleAddFriend = () => {
    setShowPopup(true);
    setButton(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedPeople = [...people];
    const date = new Date().toLocaleDateString();
  
    // Check if any of the selected names already exist in the list
    selectedNames.forEach((selectedName) => {
      const existingPerson = updatedPeople.find((person) => Object.keys(person)[0] === selectedName.value);
      if (existingPerson) {
        // Update the amount of the existing person
        existingPerson[selectedName.value] = { amount: parseInt(amount)/selectedNames.length, date };
      } else {
        // Add a new person to the list
        const newPerson = { [selectedName.value]: { amount: parseInt(amount)/selectedNames.length, date } };
        updatedPeople.push(newPerson);
      }
    });
  
    setPeople(updatedPeople);
    setShowPopup(false);
    setButton(true);
    setSelectedNames([]);
    setAmount('');
    setSplitType('');
  };
  
  

  const options = [
    { value: 'Happy', label: 'Happy' },
    { value: 'Rohan', label: 'Rohan' },
    { value: 'Kriti', label: 'Kriti' },
    { value: 'Shalu', label: 'Shalu' },
  ];

  
  return (
    <div className="container">
      {showButton && (
        <button className="expense-button" onClick={handleAddFriend}>
          Add / Edit expense
        </button>
      )}
  
      {showPopup && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <Select
              id="name"
              value={selectedNames}
              onChange={(selected) => setSelectedNames(selected)}
              options={options}
              isMulti
              placeholder="Select names"
              required
            />
  
            <input
              type="number"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
           
            <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Submit</button>
  
          </form>
        </div>
      )}
        <p className="text">Muskan</p>
      <div className="data-container">
        <div className="list-container">
          <ul className="names">
            <li key={0}>
              <b>Friends</b>
            </li>
            {people.map((person, index) => (
        <li key={index + 1}>{Object.keys(person)[0]}</li>
            ))}
          </ul>
        </div>
        <div className="list-container">
          <div className="amount-date-container">
            <ul className="numbers">
              <li key={0}>
                <b>Amount</b>
              </li>
              {people.map((person, index) => (
          <li key={index + 1}>{Object.values(person)[0].amount}</li>
              ))}
            </ul>
            <ul className="dates">
              <li key={0}>
                <b>Last modified</b>
              </li>
              {people.map((person, index) => (
          <li key={index + 1}>{Object.values(person)[0].date}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default App;
