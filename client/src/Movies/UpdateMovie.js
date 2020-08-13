import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
	metascore: "",
	stars: [],
	
};
const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
  const { push } = useHistory();

      
    useEffect(() => {
     axios
     .get(`http://localhost:5000/api/movies/${id}`)
     .then(res => setMovie(res.data))
     .catch(err =>
        console.error(
            "UpdateMovie.js: update failed: ",   err.message,)
        );
    }, [id]);
    
    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        
    
        setMovie({
          ...movie,
          [ev.target.name]: value,
          
        });
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
         /*
      1. send item data with new changes to server (PUT)
      2. read happypath and update items state
      */
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
          const newMoviesList = props.movies.map(mv => {
            if (mv.id === res.data.id) {
                return res.data
            }
            return mv
        })
        props.setMovieList(newMoviesList)
           push(`/`)
          
            })
    
          .catch(err =>
            console.error(
              "UpdateForm.js: submit failed: err: ",
              err.message)
          );
      };
    
      return (
        <div>
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="title"
              value={movie.title}
            />
            <div className="baseline" />
    
            <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="director"
              value={movie.director}
            />
            <div className="baseline" />
    
            <input
              type="number"
              name="metascore"
              onChange={changeHandler}
              placeholder="Meta Score"
              value={movie.metascore}
            />
            <div className="baseline" />
    
            <input
              type="text"
              name="stars"
              onChange={changeHandler}
              placeholder="actors"
              value={movie.stars}
            />
            <div className="baseline" />
    
            <button className="md-button form-button">Update</button>
          </form>
        </div>
      );
    };
    
    export default UpdateMovie;