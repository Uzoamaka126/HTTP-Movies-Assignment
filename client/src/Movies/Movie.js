import React from "react";
// import axios from "axios";
import MovieCard from "./MovieCard";

export default function  Movie (props) {
  const { movie } = props;
 
  // return (
  //   if (!props.movie) {
  //     return <div>Loading movie information...</div>;
  //   } 
      return (
        <div className="save-wrapper">
          <div className="save-button" onClick={props.saveMovie}>
            Save
          </div>
      </div>
      )
  // )
}