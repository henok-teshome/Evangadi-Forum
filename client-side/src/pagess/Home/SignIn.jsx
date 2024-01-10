import React from 'react'
import "./Signin.css"
import { useState } from 'react';
import {EyeInvisibleOutlined,EyeOutlined} from "@ant-design/icons"
 
function Signin({toggle}) {
const[password,setpassword ]= useState("")
const[visible, setVisble ]= useState(true)
  return (
    <div className="login__container col-md">
      <h4>Login to your account </h4>
      <p>Don’t have an account?<a onClick={toggle}  className='create'>Create a new account</a></p>
      <form>
      <input className="form-text" type="text" placeholder=" Your Email" />
       <input className='form-text iconss'
       value={password}
       type={visible? "text":"password"}
       id="password"
       placeholder="password"
       onChange={(e)=>setpassword(e.target.value)}
       />
       <span className='p-2'  onClick={()=>setVisble(!visible)}>
      {visible? <EyeOutlined/>: <EyeInvisibleOutlined/>}</span>
      <p>Forgot password?</p>
      <button className="login__signInButton " type="submit">
        Sign in
      </button>
   
      </form>
    </div>
   
  
  );
}

export default Signin