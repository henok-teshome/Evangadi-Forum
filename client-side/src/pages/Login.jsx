import React from 'react'
import { useRef } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
const emailDom=useRef();
  const passwordDom=useRef();
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
      <form onSubmit={handleSubmit}>
            
            <div>
                <span>Email:--</span>
                
                <input type="email" ref={ emailDom} placeholder='Email'/>
            </div>
               <br />
            <div>
                <span>Password:--</span>
            <input type="password"  ref={passwordDom}placeholder='Password'/>
            </div>
               <br />
            <button type="submit">Login</button>
        </form>
        <Link to={'/register'}>register</Link>
        </section>
  )
}

export default Login