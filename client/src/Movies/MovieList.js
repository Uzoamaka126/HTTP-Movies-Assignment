import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MovieList(props) {
  const { movies, deleteMovie } = props;
  console.log(movies);
  return (
    <div>
      <ul>
        {movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <MovieDetails 
                key={movie.id} 
                movie={movie} 
                deleteMovie={deleteMovie}
              />
            </Link>
        ))}
      </ul>
    </div>
  )
}

function MovieDetails({ movie }) {
  return <MovieCard movie={movie} />;
}
