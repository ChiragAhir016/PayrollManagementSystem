import './App.css';
import React from 'react';
import LoginSignUp from './Components/LoginSignup/LoginSignUp';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Components/LoginSignup/Home'; 

function App() {
  const isLoggedIn=localStorage.getItem("authToken");
  return (
      <Router>
      <Routes>
        <Route path='/' element={isLoggedIn?<Navigate to={'/Home'}/>:<LoginSignUp />} />
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </Router>
  );  
}

export default App;
