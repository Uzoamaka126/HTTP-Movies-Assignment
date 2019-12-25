import React, { useState } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieEditForm from './Movies/MovieEditForm';

const baseUrl = 'http://localhost:5000/api/movies';
 class  App extends React.Component {
  // const [savedList, setSavedList] = useState([]);
  // const addToSavedList = movie => {
  //   setSavedList([...savedList, movie]);
  // };
    constructor(props) {
      super(props);
      this.state = {
        movies: [],
        errorMessage: "",
        savedList: [],
      };
    }

  fetchMovie() {
    axios
      .get(baseUrl)
      .then(res => {
        this.setState({ movies: res.data })
      })
      .catch(err => {
        console.log(err.response);
        this.setState({ errorMessage: `Something went wrong. Error: ${err}`})
      });
  };
// Define a function to hold the state of the saved list
  addToSavedList(movie) {
    this.setState([...this.state.savedList, movie])
  };

  reloadState(data) {
    this.setState({ movies: data })
  };

  deleteMovie() {
    const {match: {params} } = this.props;
   axios.delete(`${baseUrl}/${params.movieId}`)
   .then(res => {
     this.reloadState(res.data)
     this.props.history.push('/');
   })
   .catch(err => {
     console.log("....", err)
    
   })
   .finally(() => this.props.history.push('/'))
  }
  componentDidMount() {
    this.fetchMovie();
  }

  render() {
    return (
      <div>
        <Route 
          exact 
          path="/" 
          render={props =>
             <MovieList movies={this.state.movies} {...props} deleteMovie={this.deleteMovie} />
          }  
        />

        <Route 
          path="/movies/:movieId/edit"
          render={props => 
            <MovieEditForm {...props} movies={this.state.movies} reloadState={this.reloadState}/>
          }
        />
        <Route
          path="/movies/:id"
          render={props => <Movie {...props} addToSavedList={this.addToSavedList} />}
      />
        
        {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
      </div>
    );
  }
};

export default App;
