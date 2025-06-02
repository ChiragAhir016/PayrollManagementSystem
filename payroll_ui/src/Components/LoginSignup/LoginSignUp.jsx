import React, { useState } from 'react';
import './LoginSignUp.css';
import { useNavigate } from 'react-router-dom';


import user_icon from '../Assests/person.png';
import email_icon from '../Assests/email.png';
import password_icon from '../Assests/password.png';



const LoginSignUp = () => {

  const [action,setAction] = useState("Sign Up");
  const [name, setName] =useState("");
  const [email, setEmail] =useState("bob@gmail.com");
  const [password, setPassword] =useState("123");
  const navigate = useNavigate(); 


  const handleNameChange = (event) => {
    setName(event.target.value);
  } 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSignUp = async (event) => {
        event.preventDefault();
        if (action==="Sign Up"){
          const userData = {
            name: name,
            email: email,
            password: password,
          };

        if (name === "" || email === "" || password === "") {
              alert('Please fill out all required fields');
              return;
            }
        
          try {
            
            const response = await fetch('http://localhost:5000/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });        
            
            // 200 OR 409
            if (response.ok) {
              const result = await response.json();
              console.log('Success:', result);
            } 
            else {
              console.error('Error', response.statusText)
              alert('User already Registered');
            }
          } catch (error) {
            console.error('Fetch error:', error);
          }
        }
        else
          setAction("Sign Up")
  } ;

  
  const handleLogin = async (event) => {
        event.preventDefault();
        if (action==="Login"){
          const userData = {
            email: email,
            password: password,
          };

          try {
            const response = await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });

            if (response.ok) {
              const result = await response.json();
              console.log(result) 
              alert('You Logged in Successfully');
              
              localStorage.setItem('email', email);
              localStorage.setItem("authToken",result.token);
              
              navigate('/Home');


            } else {
              console.error('Error:', response.statusText);
            }
          } catch (error) {
            console.error('Fetch error:', error);
          }
        }
        else
          setAction("Login")

  };

  return (
    <div className='container'>
        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        <div className="inputs">
          {action==="Login"?<div></div>:<div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name' value={name} onChange={handleNameChange} />
          </div>}
          
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder='Email Id' value={email} onChange={handleEmailChange} />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        {action==="Sign Up"?<div></div>: <div className="forgot-password">Create Account? <a href='' onClick={() => handleSignUp}>Click Here!</a></div>}
        <div className="submit-container">
          <div className={action==="Login"?"submit gray":"submit"} onClick={handleSignUp}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"} onClick={handleLogin}>Login</div>
        </div>
    </div>
  );
}

export default LoginSignUp
