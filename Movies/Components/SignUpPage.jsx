import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './src/SignupForm.css';

function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const navigate =  useNavigate() ; 
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (name === '' || email === '' || password === '' || age === '') {
        setError('All fields are required.');
        return;
      }
      else if(age<0){
          setError("Enter Valid Age ") ;
          return ; 
      }

      try {
        const response = await fetch('http://localhost:6050/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            Name : name , 
            email : email , 
            Age : age , 
            password : password 
           }),
        });

        if (!response.ok) throw new Error('Signup failed');
        const data = await response.json();
        console.log('Signup successful', data);
        navigate("/") ; 
      } catch (error) {
        setError('Signup failed');
      }
      setError('');
    };

    return (
      <div className="signup-form-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" value={age} name='Age' onChange={(e) => setAge(e.target.value)} />
          </div>
          <button id='btn' type="submit">Sign Up</button>
        </form>
        <p>Already Have An Account? <a href="/">Login</a></p>
      </div>
    )
}

export default SignUpPage ; 
