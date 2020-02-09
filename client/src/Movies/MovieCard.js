import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const MovieCard = props => {
  const { id, title, director, metascore, stars } = props.movie;
  const link = `/update-movie/${id}`;
  let history = useHistory();

  function deleteMovie() {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <Link className="edit-button" to={link}>
        Edit
      </Link>
      <button className="delete-button" onClick={() => deleteMovie()}>
        Delete
      </button>
    </div>
  );
};

export default MovieCard;
