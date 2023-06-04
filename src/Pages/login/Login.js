import React, {useState} from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const HandleLogin = async () => {
    if (username === "abdullah"){
        if (password === "abdullah.123"){
            navigate("/master-sheet", {state: {name:'Abdullah'}}); 
        }
    }
    else if (username === "ahmad"){
        if (password ==="ahmad.123"){
            navigate("/generate-sheets", {state: {name:'Ahmad'}}); 
        }
    }
    
  }
    return(
        <div className='login-container'>
            

            <div className='login-left'>
                <div className='credentials'>
                <h1>OBE-System</h1>
                <form onSubmit={HandleLogin}>
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