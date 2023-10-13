import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://127.0.0.1:8000/authentication/get_user/?username=${username}&password=${password}`);

      if (response.data) {
        console.log(response.data);
        localStorage.setItem('role', response.data.role);

        setTimeout(() => {
          if (localStorage.getItem('role') === "admin") {
            navigate('/master-sheet');
          } else {
            navigate('/generate-sheets');
          }
        }, 100);
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='login-container'>
      <div className='login-left'>
        <div className='credentials'>
          <h1>OBE-System</h1>
          <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
          <TextField 
              type='text' 
              label='Username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={{ marginBottom: '10px' }} // Add some margin
              size='small'
            />
            <TextField 
              type='password' 
              label='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ marginBottom: '10px' }} // Add some margin
              size='small'
            />
            <Button 
              className='login-btn' 
              type='submit' 
              variant='contained' 
              color='primary' 
              fullWidth={false} // No need for fullWidth
            >
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className='login-right'>
        <img className='login-img' src='images/showcase.gif' alt="Imagehere" width="100%" height="100%" />
      </div>
    </div>
  );
}

export default Login;
