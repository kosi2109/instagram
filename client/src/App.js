import React, { useEffect } from 'react';
import { Routes , Route, useNavigate} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './containers/Main';

function App() {
  

  return (    
      <Routes>
        <Route path="/accounts/login" element={<Login/>} />
        <Route path="/accounts/emailsignup" element={<Signup/>} />
        <Route path="/*" element={<Main/>} />
      </Routes>
    );
}

export default App;

