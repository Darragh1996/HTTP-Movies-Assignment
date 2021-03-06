import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MovieForm(props) {
  const id = props.match.params.id;
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });
  const [message, setMessage] = useState("");

  console.log(props);

  function getMovies() {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (props.edit) {
      getMovies();
    }
  }, []);

  function handleChanges(event) {
    if (event.target.name === "stars") {
      setMovie({
        ...movie,
        [event.target.name]: event.target.value.split(",")
      });
    } else {
      setMovie({
        ...movie,
        [event.target.name]: event.target.value
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (props.edit) {
      axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      setMessage("edit pending...");

      setTimeout(() => {
        setMessage("edit complete!");
      }, 1000);
      setTimeout(() => {
        setMessage("");
      }, 1500);

      setTimeout(() => {
        props.history.push("/");
      }, 1600);
    } else {
      axios
        .post("http://localhost:5000/api/movies", movie)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      setMovie({ id: "", title: "", director: "", metascore: "", stars: [] });
      setMessage("adding movie...");

      setTimeout(() => {
        setMessage("movie added!");
      }, 1000);
      setTimeout(() => {
        setMessage("");
      }, 1500);

      setTimeout(() => {
        props.history.push("/");
      }, 1600);
    }
  }

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <label>
        Title:
        <input
          name="title"
          value={movie.title}
          onChange={event => handleChanges(event)}
        />
      </label>
      <label>
        Director:
        <input
          name="director"
          value={movie.director}
          onChange={event => handleChanges(event)}
        />
      </label>
      <label>
        Metascore:
        <input
          name="metascore"
          value={movie.metascore}
          onChange={event => handleChanges(event)}
        />
      </label>
      <label>
        Stars:
        <input
          name="stars"
          value={movie.stars}
          onChange={event => handleChanges(event)}
        />
      </label>
      <input type="submit" />
      <div>
        <h2>{message}</h2>
      </div>
    </form>
  );
}
