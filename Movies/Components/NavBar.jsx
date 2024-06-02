import React , {useState}from 'react'
import { useNavigate } from 'react-router-dom';
import myimage from '/movielogo.jpg' ; 
import './src/Navbar.css';


function NavBar({setIsAuth}) {
  const navigate = useNavigate() ; 
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/');
  };
  return (
    <div>
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <img src={myimage} alt="Movie Search Logo" className="logo-img" />
                    <span className="app-name">MovieHunt</span>
                </div>
                <div className="nav-links">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default NavBar