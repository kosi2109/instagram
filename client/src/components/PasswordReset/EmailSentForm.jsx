import React, { useEffect, useRef, useState } from 'react';
import FormContainer from '../FormContainer';
import {FiLock} from "react-icons/fi"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCodeSent } from '../../actions/auth';


const inputDiv =
  "my-5 px-2 bg-search focus:outline-borderActive flex w-full h-8 border rounded border-borderPrimary";



function EmailSentForm() {
    const [email,setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(resetCodeSent(email,navigate))
    }

    const error = useSelector((state) => state.error);

  return <FormContainer>
      <FiLock size={40}/>
      <h5 className='font-bold my-2'>Trouble Logging In?</h5>
      <div>
          <p className='text-xs text-center text-textSecondary'>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
      </div>
      <form onSubmit={handleSubmit}>
          <input type="text" required name='email' placeholder='email' onChange={e=> setEmail(e.target.value)} className={inputDiv} />
          <button
          className={
            email.length > 5
              ? "bg-btnPrimary w-full p-1 rounded-md text-secondary"
              : "bg-btnSecondary w-full p-1 rounded-md text-primary"
          }
          type="submit"
          disabled={email.length < 5}
        >
          Sent Login Link
        </button>
      </form>
      {error && (
        <div className="w-full text-center text-danger my-2 py-2">
          <p>{error}</p>
        </div>
      )}
      <div className="w-full h-8 p-3 relative flex items-center justify-center">
        <div
          style={{
            position: "absolute",
            borderBottom: "1px solid #DBDBDB",
            width: "100%",
            height: "1px",
            zIndex: "1",
          }}
        ></div>
        <div className="bg-secondary w-16" style={{ zIndex: "5" }}>
          <h6 className="text-center text-sm text-borderActive">OR</h6>
        </div>
        
      </div>
      <div className='pb-50'>
      <Link to="/accounts/emailsignup" className='font-medium' >Create New Account</Link>   
      </div>
      
      <Link to="/accounts/login" className='w-full absolute bottom-0' >
          <button className='w-full bg-primary p-2 border border-borderPrimary'>Back To Login</button>
      </Link>

  </FormContainer>;
}

export default EmailSentForm;
