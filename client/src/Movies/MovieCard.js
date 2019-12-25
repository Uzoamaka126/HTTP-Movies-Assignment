import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  console.log(movie)
  const { id, title, director, metascore, stars, deleteMovie, updateMovie } = movie; 

  // debugger
  return (
    <div className="movie-card">
      <p>{id}</p>
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>
    {/* For each movie star belonging to a particular movie card */}
        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
        <div className="actions-buttons">
          <span className="edit-button" >
            <Link to={`/movies/${id}/edit`}>
              <button>Edit</button>
            </Link>
          </span>
          <span className="delete-button" >
            <button onClick={() => deleteMovie(id)}>
              Delete
            </button>
          </span>
        </div>
    </div>
  )
}
