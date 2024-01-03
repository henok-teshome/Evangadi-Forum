import React from 'react'
import './Login.css'; 
import {useState, useRef } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
const emailDom=useRef();
  const passwordDom=useRef();
    const [showPassword, setShowPassword] = useState(false);

const togglePassword = () => {
  console.log('Toggle password clicked');
  setShowPassword(!showPassword);
};

  async function handleSubmit(e){
  e.preventDefault();
    
    const emailvalue=emailDom.current.value;
    const passvalue=passwordDom.current.value;
  
    if(!emailvalue||!passvalue){
      alert("Please provide all required fields")
      return;
    }


   try {
   const {data}= await axios.post('users/login',{
    
    email:emailvalue,
    password:passvalue
  });
  alert("login Successfully!!");
  localStorage.setItem('token',data.token)
  //navigate("/home");
  console.log(data)
  } catch (error) {
    alert(error?.response?.data?.msg)
    console.log(error.response.data);
    
  }
}



  return (
    <section>
      <h1>Login to Your account</h1>
      <h3>Don't have an account?<Link to={'/register'}>Create a new account</Link></h3>
      <form onSubmit={handleSubmit}>
            
            <div>
                <span>Email:--</span>
                
                <input type="email" ref={ emailDom} placeholder='Email address'/>
            </div>
               <br />
              <div className="password-container">
        <span>Password:--</span>
        <input
          type={showPassword ? 'text' : 'password'}
          ref={passwordDom}
          placeholder="Password"
        />
        <span id="toggleBtn" onClick={() => togglePassword()}>
          👁️
        </span>
      </div>
               <br />
               <p>
          <Link to="/forgot-password">Forget Password ?</Link>
        </p>
            <button type="submit">Login</button>
            
        </form>
        
        </section>
  )
}

export default Login