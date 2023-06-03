import React, {useState} from 'react';
import axios from 'axios';
import './Login.css'

function Login(){
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    const response = await axios.post('/login/', { username, password });
  }
    return(
        <div className='login-container'>
            

            <div className='login-left'>
                <div className='credentials'>
                <h1>OBE-System</h1>
                <form onSubmit={handleLogin}>
                <input type='text' value={username} placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}></input><br></br>
                <input type='password' value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}></input><br></br>
                <button className='login-btn' type='submit'>Login</button>
                </form>
                </div>
                
            </div>
            <div className='login-right'>
                <img className='login-img' src='images/showcase.gif' alt="Imagehere" width="100%" height="100%"></img>

            </div>

        </div>
    );
}

export default Login;