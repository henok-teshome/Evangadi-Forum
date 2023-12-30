import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from '../axiosConfig';
function Register() {
  const navigate = useNavigate();
  const usernameDom=useRef();
  const firstnameDom=useRef();
  const lastnameDom=useRef();
  const emailDom=useRef();
  const passwordDom=useRef();
  
  async function handleSubmit(e){
  e.preventDefault();
    const usernamevalue=usernameDom.current.value;
    const firstvalue=firstnameDom.current.value;
    const lastvalue=lastnameDom.current.value;
    const emailvalue=emailDom.current.value;
    const passvalue=passwordDom.current.value;
  
    if(!usernamevalue||!firstvalue||!lastvalue||!emailvalue||!passvalue){
      alert("Please provide all required fields")
      return;
    }


   try {
    await axios.post('users/register',{
    username:usernamevalue,
    firstname:firstvalue,
    lastname:lastvalue,
    email:emailvalue,
    password:passvalue
  });
  alert("Successfully registered.please login");
  navigate("/login");
  } catch (error) {
    alert("something went wrong")
    console.log(error.response);
    
  }
}
  return (
     <section>
        <form onSubmit={handleSubmit}>
            <div>
                <span>Username:--</span>
               
                <input type="text" ref={usernameDom} placeholder='Username'/>
            </div>
                <br />
            <div>
                <span>First Name:--</span>
                
                <input type="text" ref={firstnameDom}placeholder='First Name'/>
            </div>
               <br />
            <div>
                <span>Last Name:--</span>
                
                <input type="text" ref={lastnameDom} placeholder='Last Name'/>
            </div>
              <br />
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
            <button type="submit">Register</button>
        </form>
        <Link to={'/login'}>login</Link>
    </section>
  )
}

export default Register;