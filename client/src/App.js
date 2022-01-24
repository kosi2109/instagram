import React from 'react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import Home from './containers/Home';

function App() {
  return (
    <Router>  
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/*" element={<Home/>} />
      </Routes>
    </Router>
    );
}

export default App;

