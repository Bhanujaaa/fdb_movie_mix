import React from "react";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const ProducerCard = ({ producer }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img src={producer.image_url} alt={producer.movie_person_name} />
      <div className="movie-details">
        <h3>{producer.movie_person_name}</h3>
      </div>
    </div>
  );
};

export default ProducerCard;
