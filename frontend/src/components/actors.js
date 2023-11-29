import React from "react";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const ActorCard = ({ actor }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card">
      <img src={actor.image_url} alt={actor.movie_person_name} />
      <div className="movie-details">
        <h3>{actor.movie_person_name}</h3>
      </div>
    </div>
  );
};

export default ActorCard;
