import React from 'react'
import './src/MoviePage.css'

function MoviePage({movie}) {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-image" />
      <div className="movie-details">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-rating">Rating: {movie.rating}/10</p>
        <p className="movie-year">Year: {movie.year} </p>
      </div>
    </div>
  )
}

export default MoviePage







