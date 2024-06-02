import React, { useState , useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './src/LoginForm.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (email === '' || password === '') {
        setError('Both fields are required.');
        return;
      }
      try {
        const response = await fetch('http://localhost:6050/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok)  throw new Error('Authentication failed');
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log('Authentication successful', data);
        navigate('/home'); // Redirect to home page
      } catch (error) {
        setError('Authentication failed');
        console.log('Authentication failed');
        setError('Email or Password Are Wrong 🤨');
      }
      setError('');
    };
  
    return (
      <div className="login-form-container">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button id='btn' type="submit">Login</button>
        </form>
        <p id='last'>New user? <a href="/Signup">Create an account</a></p>
      </div>
    );
}

export default LoginPage ;
