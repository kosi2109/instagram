import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes , Route, useNavigate, useLocation} from "react-router-dom";
import { clearError } from './actions/error';
import Login from './components/Login';
import EmailSendMes from './components/PasswordReset/EmailSendMes';
import EmailSentForm from './components/PasswordReset/EmailSentForm';
import PasswordResetComfirm from './components/PasswordReset/PasswordResetComfirm';
import Signup from './components/Signup/Signup';
import Main from './containers/Main';

function App() {
  const dispatch = useDispatch()

  const location = useLocation()
    dispatch(clearError())
  useEffect(()=>{

  },[location])

  return (    
      <Routes>
        <Route path="/accounts/login" element={<Login/>} />
        <Route path="/accounts/emailsignup" element={<Signup/>} />
        <Route path="/accounts/password/reset" element={<EmailSentForm/>} />
        <Route path="/accounts/password/challenge" element={<EmailSendMes/>} />
        <Route path="/accounts/password/reset/comfirm/:token" element={<PasswordResetComfirm/>} />
        <Route path="/*" element={<Main/>} />
      </Routes>
    );
}

export default App;

