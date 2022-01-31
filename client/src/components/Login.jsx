import React, { useState } from 'react';
import Logo from "../assets/logo.png"
import {useDispatch, useSelector} from "react-redux"
import { login } from '../actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillFacebook } from 'react-icons/ai';

const inputDiv =
  "mb-3 bg-search peer-focus:outline-borderActive flex w-full h-8 border rounded border-borderPrimary";
const inputSty = "w-full h-full bg-search outline-none border-none peer px-2";

function Login() {
  const [form, setForm] = useState({email:"",password:""});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(login(form,navigate))
  }

  const error = useSelector((state)=> state.error)
  
  return (
  <div className='flex flex-col justify-start items-center mt-8'>
    <div className='pt-8 bg-secondary px-16 w-350 flex flex-col justify-start items-center mb-5 rounded border-2 border-borderPrimary' >
      <img src={Logo} alt="logo" className='w-150 h-auto py-5' />
      <form className='w-full flex flex-col justify-center items-center py-3' onSubmit={handleSubmit}>
      <div className={inputDiv}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              autoComplete="off"
              className={inputSty}
              value={form.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
           
      </div>
      <div className={inputDiv}>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className={inputSty}
              value={form.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
           
      </div>
         
        <button className='mb-3 bg-btnPrimary text-secondary rounded-sm w-full h-8' type='submit'>Login</button>
      </form>
      <div className="w-full h-8 p-3 relative flex items-center justify-center">
          <div style={{position:"absolute",borderTop:"1px solid #DBDBDB",width:"100%",height:"1px",zIndex:"1"}}></div>
          <div className="bg-secondary w-16" style={{zIndex:"5"}}>
            <h6 className="text-center text-sm text-borderActive">OR</h6>

          </div>
        </div>
      <div className='w-full py-3'>
      <button className="bg-btnPrimary w-full p-1 rounded-md text-secondary flex justify-center items-center font-medium mb-5">
          <span>
            <AiFillFacebook size={23} />
          </span>
          Log in with Facebook
        </button>
        {error && <div className='w-full text-center text-danger my-4 p-2'>
          <p>{error}</p>
        </div>}
        
        <h6 className='text-center'>Forgot Password ?</h6>
      </div>
    </div>
    <div>

    </div>
    <div className='bg-secondary w-350 py-4 rounded border-2 border-borderPrimary' >
      <h5 className='text-center'>Don't have an account? <Link to="/accounts/emailsignup"><span className="text-btnPrimary font-bold">Sign Up</span></Link></h5>
    </div>
  </div>
  );
}

export default Login;