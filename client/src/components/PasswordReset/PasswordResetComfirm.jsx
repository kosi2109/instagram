import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetCodeComfirm } from '../../actions/auth';
import FormContainer from '../FormContainer';

const inputDiv =
  "my-5 px-2 bg-search focus:outline-borderActive flex w-full h-8 border rounded border-borderPrimary";


export default function PasswordResetComfirm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useParams()
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(resetCodeComfirm({password,password2},token,navigate))
    }

    const error = useSelector((state) => state.error);
    
  return <FormContainer>
      <div className='py-5'>
        <h5 className='text-center font-medium mb-3'>Create A Strong Password</h5>
        <h6 className='text-center font-sm text-textSecondary mb-3'>Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%).</h6>
        <form onSubmit={handleSubmit} >
            <input placeholder='New Password' className={inputDiv} type="password" name='password' onChange={e=> setPassword(e.target.value)} />
            <input placeholder='New Password , again' className={inputDiv} type="password" name='password2' onChange={e=> setPassword2(e.target.value)} />
            <button
          className={
            password === password2
              ? "bg-btnPrimary w-full p-1 rounded-md text-secondary"
              : "bg-btnSecondary w-full p-1 rounded-md text-primary"
          }
          type="submit"
          disabled={password !== password2}
        >
          Reset Password
        </button>
        </form>
        {error && (
        <div className="w-full text-center text-danger my-2 py-2">
          <p>{error}</p>
        </div>
      )}
      </div>
      </FormContainer>;
}
