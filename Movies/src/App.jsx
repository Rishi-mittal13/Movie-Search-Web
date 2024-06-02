import { BrowserRouter , Routes , Route , Navigate} from "react-router-dom" ; 
import React, { useState , useEffect} from 'react';
import HomePage from "../Components/HomePage";
import LoginPage from "../Components/LoginPage";
import MoviePage from "../Components/MoviePage";
import SignUpPage from "../Components/SignUpPage";
import "./App.css"

function App(){
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem('token');
  const checkAuth = () => {
    if (token) setIsAuth(true);
    else setIsAuth(false);
  };
  useEffect(() => {
    checkAuth();
  }, [token]);

  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={<HomePage setIsAuth = {setIsAuth} />}
      />
      <Route
        path="/movies/:movieID"
        element={<MoviePage />}
      />
      <Route 
        path="/signup"
        element={<SignUpPage />}
      />
      <Route path="/logout" />
    </Routes>
  </BrowserRouter>
  )
}
export default App ; 
