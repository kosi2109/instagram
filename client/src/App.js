import React from 'react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Login from './components/Login';
import Main from './containers/Main';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/accounts/login" element={<Login/>} />
        <Route path="/*" element={<Main/>} />
      </Routes>
    </Router>
    );
}

export default App;

