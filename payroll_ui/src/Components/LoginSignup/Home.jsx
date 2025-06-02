import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


  const Home = () => {

    const navigate = useNavigate();
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    const [id, setId] =useState("");

    useEffect( () => {
      async function userData() {
        const request_data = {
          email : localStorage.getItem("email"),
          token : localStorage.getItem("authToken")
        };

        try {
            const response = await fetch('http://localhost:5000/get_user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(request_data),
            });

            if(response.ok) {
              const result = await response.json();
              console.log(result.name, result.email)
              setName(result.name)
              setEmail(result.email)
              setId(result.id)
            }
            else {
              console.log("error")
            }

          } catch (error) {
            console.log("error")
          }
        } userData(); 
      },[])

    const handleSignOut = async(event) => {
        event.preventDefault();


        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        alert("You SignedOut Successfully")  
        navigate('/');
    };

    
    return (
      <div>
        <h1>Welcome to the Homepage!</h1>
        <p>name:{name}</p>
        <p>email:{email}</p>
        <p>id:{id}</p>
        <button onClick={handleSignOut} className='Sign Out'> Sign Out</button> 
      </div> 
    );

  }


export default Home;