import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes , Route, useNavigate, useLocation} from "react-router-dom";
import { clearError } from './actions/error';
import Login from './components/Login';
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
        <Route path="/*" element={<Main/>} />
      </Routes>
    );
}

export default App;

