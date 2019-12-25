import React, { useState, useRef } from "react";
import axios from 'axios';

export default function MovieEditForm (props) {
    // { match: { params: { id } }, movies, history }
    console.log(props);
    const { movieId } = props.match.params;
    const { movies } = props;
    const { history } = props;
    const { reloadState } = props;
    console.log(movies, Number(movieId), history)
    const findMovieToEdit = movies.find(item => item.id === Number(movieId));

    console.log(findMovieToEdit);

    const [editMovie, setEditMovie] = useState({
        id: findMovieToEdit.id,
        title: "",
        director: "",
        metascore: "",
        stars: findMovieToEdit.stars
    });

    console.log(editMovie);
 
    function updateMovie(movieData) {
        axios.put(`http://localhost:5000/api/movies/${movieId}`, movieData)
          .then(() => {
              console.log(`${movieId}`)
              console.log(movieData);

            history.push('/');
            reloadState(movies);
          })
          .catch(err => {
            console.log(err);
      })
    }

    const handleChange = event => {
        setEditMovie({ ...editMovie, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateMovie(editMovie);
    };

    return (
        <div>
            <form onSubmit={event => handleSubmit(event)}>
                <div className="form-group">
                    <label>Title</label>
                    <input name="title" type="text" value={editMovie.title} onChange={event => handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label>Director</label>
                    <input name="director" type="text" value={editMovie.director} onChange={event => handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label>Metascore:</label>
                    <input name="metascore" type="text" value={editMovie.metascore}  onChange={event => handleChange(event)}/>
                </div>
                <button>Update Movie</button>
            </form>
        </div>
    )
}