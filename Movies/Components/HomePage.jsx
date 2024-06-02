import React , {useState}from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import MoviePage from './MoviePage';
import Footer from './Footer';

function HomePage({setIsAuth}) {
  const [title , setTitle] = useState("") ; 
  const [res , setRes] = useState([]) ; 
  const url = `https://advanced-movie-search.p.rapidapi.com/search/movie?query=${title}&page=1`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3bf01746a6mshc01d100e65544ecp1ed81fjsn978707ae2285',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };
  const handleSubmit = async (e) => {
    try {
      setRes(res=>[])
      const response = await fetch(url, options);
      let result = await response.text();
      result =  JSON.parse(result).results; 
      for(let item of result){
        let newItem = { id: item.id , title: item.title , image: item.poster_path , rating: item.vote_average , year:item.release_date.substring(0 ,4)};
        setRes(res=>[...res , newItem]);
      }; 
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  //sample data . 
  const movies = [ 
    {
      image: 'https://m.media-amazon.com/images/I/71DwIcSgFcS.jpg', 
      title: 'Inception',
      rating: 8.8,
      year: 2010 , 
      imdbid: 'tt1375666' 
    } , 
    {
      image: 'https://m.media-amazon.com/images/I/814E2+pjjzL._AC_UF894,1000_QL80_.jpg', 
      title: 'Interstellar',
      rating: 8.7,
      year: 2014 ,
      imdbid: 'tt0816692' 
    } , 
    {
      image: 'https://m.media-amazon.com/images/I/71uoicxpqoS._AC_UF1000,1000_QL80_.jpg', 
      title: 'Titanic',
      rating: 7.9,
      year: 1997,
      imdbid: 'tt0120338' 
    } , 
    {
      image: 'https://m.media-amazon.com/images/I/A1SU7U7mFXL._AC_UF894,1000_QL80_.jpg', 
      title: 'The Martian',
      rating: 8.0,
      year: 2015,
      imdbid: 'tt3659388' 
    } , 
    {
      image: 'https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF1000,1000_QL80_.jpg', 
      title: 'Avengers: Endgame',
      rating: 8.4,
      year: 2019 ,
      imdbid: 'tt4154796' 
    } , 
    {
      image: 'https://m.media-amazon.com/images/I/81218n6JFgL._AC_UF1000,1000_QL80_.jpg', 
      title: 'Oppenheimer',
      rating: 8.3,
      year: 2023,
      imdbid: 'tt15398776' 
    } , 
    {
      image: 'https://images-cdn.ubuy.co.in/64730bee6e862458b77e732a-dune-movie-poster-cast-montage-timothee.jpg', 
      title: 'Dune',
      rating: 8.0,
      year: 2021 ,
      imdbid: 'tt1160419' 
    } ,
    {
      image: 'https://m.media-amazon.com/images/M/MV5BMmNkYWMwZjQtNDQyZC00OTgxLTk0ZWEtNmMwNzQ1MmQ2ODYyXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg', 
      title: 'Through My Window',
      rating: 5.5,
      year: 2022 ,
      imdbid: 'tt14463484' 
    } ,
]
    

  return (
    <>
      <NavBar setIsAuth={setIsAuth}/>
      <div className='searchContainer'>
        <input className='searchInput' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Search for movies..."/>
        <button className='searchButton' onClick={handleSubmit}> Search </button>
      </div>
      <div className="horizontal-line"></div>
      <div className="block-heading">Search Results </div>
      <div className='movieShowPage'>
        {res.map((movie , index)=>(
          <MoviePage movie={movie} />
        ))}
      </div >



      <div className="horizontal-line"></div>
      <div className="block-heading">ALL TIME HITS</div>
      <div className='movieShowPage'>
        {movies.map((movie , index)=>(
          <MoviePage movie={movie} />
        ))}
      </div >
      <div className="horizontal-line"></div>
      <Footer />
    </>
  )
}

export default HomePage



