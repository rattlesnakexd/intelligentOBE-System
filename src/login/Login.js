import React from 'react'
import './Login.css'

function Login(){
    return(
        <div className='login-container'>
            

            <div className='login-left'>
                <div className='credentials'>
                <h1>OBE-System</h1>
                <input type='text' placeholder='Enter Username'></input><br></br>
                <input type='password' placeholder='Enter Password'></input><br></br>
                <button className='login-btn'>Login</button>

                </div>
                
            </div>
            <div className='login-right'>
                <img className='login-img' src='images/showcase.gif' alt="Imagehere" width="100%" height="100%"></img>

            </div>

        </div>
    );
}

export default Login;