import React, { useState, useEffect } from 'react';

function App() {
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState(''); 
  const [message, setMessage] = useState('');

  const handleLockToggle = async (lockNumber) => {
    try {
      let response;
      if (lockNumber === 1 && pin === '1234') {
        response = await fetch('http://10.20.28.135:3000/toggle-lock-1', {
          method: 'POST'
        });
      } else if (lockNumber === 2 && pin2 === '5678') { 
        response = await fetch('http://10.20.28.135:3000/toggle-lock-2', {
          method: 'POST'
        });
      } else {
        setMessage('Invalid PIN or lock number');
        return;
      }
      
      if (response.ok) {
        setMessage(`Lock ${lockNumber} toggled successfully`);
      } else {
        setMessage('Error toggling lock');
      }
    } catch (error) {
      setMessage('');
    }
  };

  const handlePinChange = (event, lockNumber) => {
    if (lockNumber === 1) {
      setPin(event.target.value);
    } else if (lockNumber === 2) {
      setPin2(event.target.value);
    }
  };

  useEffect(() => {
    if (pin !== '' || pin2 !== '') {
      // Reload the page after 2 seconds (2000 milliseconds)
      setTimeout(() => {
        window.location.reload();
      }, 7000);
    }
  }, [pin, pin2]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Lock Control</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <label style={{ marginBottom: '5px', display: 'block' }}>Enter PIN for Lock 101:</label> 
          <input type="password" value={pin} onChange={(event) => handlePinChange(event, 1)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '5px' }} /> 
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <label style={{ marginBottom: '5px', display: 'block' }}>Enter PIN for Lock 102:</label> 
          <input type="password" value={pin2} onChange={(event) => handlePinChange(event, 2)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '5px' }} /> 
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <button onClick={() => handleLockToggle(1)} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>Unlock Lock 101</button>
        </div>
        <div>
          <button onClick={() => handleLockToggle(2)} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>Unlock Lock 102</button>
        </div>
      </div>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}

export default App;
