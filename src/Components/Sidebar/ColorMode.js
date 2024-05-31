import React, { useState } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import './Sidebar.css';

function ColorMode({ onModeChange }) {
  const [mode, setMode] = useState('light');

  const toggle = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(0,0,0)';
      document.body.style.color = 'white';
      onModeChange('dark');
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      onModeChange('light');
    }
  };

  return (
    <div>
      <button 
        onClick={toggle} 
        className='btn' 
        style={{
          backgroundColor: mode === 'light' ? 'white' : 'black',
          color: mode === 'light' ? 'black' : 'white',
          border: 'none',
          borderColor: mode === 'light' ? 'black' : 'white',
          padding: '8px 16px',
          fontSize: '16px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
        }}
      >
        <IoSunnyOutline />
      </button>
    </div>
  );
}

export default ColorMode;
