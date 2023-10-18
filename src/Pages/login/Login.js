import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import { TextField, Button, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const {setUser} = useUser()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const csrfToken = Cookies.get('csrftoken');
      console.log(csrfToken)
      const response = await axios.post(`http://127.0.0.1:8000/auth/login`, { username, password }, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
        localStorage.setItem('role', response.data.role);
        setUser(response.data)

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
        setError('An error occurred. Please try again.');
        setOpen(true);
    }
}

  const handleClose = () => {
    setOpen(false);
  };

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
              style={{ marginBottom: '10px' }} 
              size='small'
            />
            <TextField 
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              label='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              size='small'
            />
            <FormControlLabel
              control={<Checkbox 
                checked={showPassword} 
                onChange={(e) => setShowPassword(e.target.checked)} 
                color="primary" 
              />}
              label="Show Password"
            />
            <Button 
              className='login-btn' 
              type='submit' 
              variant='contained' 
              color='primary' 
              fullWidth={false} 
            >
              Login
            </Button>
          </form>
          <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={error}
            />
        </div>
      </div>
      <div className='login-right'>
        <img className='login-img' src='images/showcase.gif' alt="Imagehere" width="100%" height="100%" />
      </div>
    </div>
  );
}

export default Login;