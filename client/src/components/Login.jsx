import React, { useState } from 'react';
import Logo from "../assets/logo.png"
import {useDispatch} from "react-redux"
import { login } from '../actions/auth';

function Login() {
  const [form, setForm] = useState({email:"",password:""});
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(login(form))
  }


  return (
  <div className='flex flex-col justify-start items-center mt-8'>
    <div className='pt-8 bg-secondary px-16 w-350 flex flex-col justify-start items-center mb-5' >
      <img src={Logo} alt="logo" className='w-150 h-auto py-5' />
      <form className='w-full flex flex-col justify-center items-center py-3' onSubmit={handleSubmit}>
        <input type="text" className='mb-3 bg-primary w-full h-8' name='email' value={form.email} onChange={handleChange}/>
        <input type="text" className='mb-3 bg-primary w-full h-8' name='password' value={form.password} onChange={handleChange}/>
        <button className='mb-3 bg-primary w-full h-8' type='submit'>Login</button>
      </form>
      <div className='w-full py-3'>
        <h5 className='text-center'>Login with Facebook</h5>
        <h6 className='text-center'>Forgot Password ?</h6>
      </div>
    </div>
    <div>

    </div>
    <div className='bg-secondary w-350 py-4' >
      <h5 className='text-center'>Don't have an account? Sign Up</h5>
    </div>
  </div>
  );
}

export default Login;