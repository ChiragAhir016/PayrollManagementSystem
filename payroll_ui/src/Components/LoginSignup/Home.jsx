import React from 'react';
import { useNavigate } from 'react-router-dom';



// function Home() {
  const Home = () => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const handleSignOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
  };
  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p> name: {name}</p>
      <p>email: {email}</p> 
      <button onClick={handleSignOut}>Sign Out</button> 
    </div> 
  );
}


export default Home;