import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ActorCard from "./actors";
import ProducerCard from "./producers";
import { useNavigate } from "react-router-dom";
import "../Styling/movie_details.css";
import "../Styling/review_card.css";
import secureLocalStorage from "react-secure-storage";
import Modal from "react-modal";

const MovieDetails = () => {
  console.log();
  const navigate = useNavigate();
  const { movieId } = useParams();
  console.log(movieId);
  const [movieDetails, setMovieDetails] = useState(null);
  const [actors, setActors] = useState(null);
  const [producers, setProducers] = useState(null);
  const [genre, setGenre] = useState(null);
  const [lang, setLang] = useState(null);
  const [reviews, setReview] = useState(null);
  const [movie_rating, setMovieRating] = useState([]);
  const [comment, setComments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBack = () => {
    navigate(`/user`);
  };
  // console.log(movieId, movieID);
  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/${movieId}`)
      .then((response) => {
        setMovieDetails(response.data);
        console.log(response);
      })

      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/lang/${movieId}`)
      .then((response) => {
        setLang(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/actors/${movieId}`)
      .then((response) => setActors(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/producer/${movieId}`)
      .then((response) => setProducers(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/genre/${movieId}`)
      .then((response) => setGenre(response.data))
      .catch((error) => console.error(error));

    Axios.get(`http://localhost:8080/review/get/${movieId}`)
      .then((response) => {
        setReview(response.data);
        console.log(response);
      })
      .catch((error) => console.error(error));
  }, [movieId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const ReviewSubmit = (e) => {
    console.log("here i am");
    e.preventDefault();
    const current_date = new Date();
    const review_date = current_date.getDate();
    const review = {
      movie_rating: movie_rating,
      comment: comment,
      review_date: review_date,
      user_id: secureLocalStorage.getItem("user_id"),
      movie_id: movieId,
    };
    console.log("request body is here", review);
    Axios.post(`http://localhost:8080/review/create`, review)
      .then((response) => {
        console.log(response);
        alert("movie review added successfully");
        closeModal();
      })
      .then((err) => console.log(err));
  };
  console.log(actors);
  console.log(producers);
  console.log(genre);

  return (
    <div className="movie-details-container">
      {movieDetails ? (
        <div className="movie-info-section">
          <div className="movie-header">
            <h1 style={{ fontSize: "70px" }} className="movie-title">
              {movieDetails.title}
            </h1>
            <img
              onClick={handleBack}
              src="https://www.svgrepo.com/show/495032/back-square.svg"
              alt="Back"
              className="back-icon"
            />
          </div>
          <p className="movie-description">{movieDetails.description}</p>
          <h3 className="movie-director">Director: {movieDetails.director}</h3>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}

      <div className="movie-languages">
        <h1>Languages:</h1>
        {lang ? (
          <div className="language-list">
            {lang.map((l) => (
              <div className="language-bubble" key={l.lang_name}>
                {" "}
                {l.lang_name}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading languages...</p>
        )}
      </div>

      <div className="movie-genres">
        <h1>Genre:</h1>
        {genre ? (
          <div className="genre-list">
            {genre.map((gen) => (
              <div className="genre-bubble" key={gen.genre_name}>
                {gen.genre_name}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading genres...</p>
        )}
      </div>

      <div className="movie-cast">
        <h1>Cast:</h1>
        {actors ? (
          <div className="actor-list">
            {actors.map((actor) => (
              <ActorCard key={actor.movie_person_id} actor={actor} />
            ))}
          </div>
        ) : (
          <p>Loading cast...</p>
        )}
      </div>

      <div className="movie-producers">
        <h1>Producer:</h1>
        {producers ? (
          <div className="producer-list">
            {producers.map((producer) => (
              <ProducerCard
                key={producer.movie_person_id}
                producer={producer}
              />
            ))}
          </div>
        ) : (
          <p>Loading producers...</p>
        )}
      </div>

      <h1>User Reviews:</h1>
      <div>
        {reviews?.map((review) => (
          <div key={review.review_id} className="review-card">
            <p>Comment: {review.comment}</p>
            <p>Movie Rating: {review.movie_rating}</p>
            <p>Review Date: {review.review_date}</p>
            <p>User Name: {review.username}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Coupon Selection Modal"
        style={{
          content: {
            width: "75%", // Adjust the width as needed
            height: "50%",
            margin: "auto", // Center the modal horizontally
          },
        }}
      >
        <h2>Add Review for the movie {movieDetails?.title}</h2>
        <div className="form-container">
          <form onSubmit={ReviewSubmit}>
            <div className="mb-3">
              <label htmlFor="c_name" className="label">
                Movie Rating
              </label>
              <input
                type="number"
                className="input"
                value={movie_rating}
                onChange={(e) => setMovieRating(e.target.value)}
                placeholder="Movie Rating"
                id="m_rate"
                name="m_rate"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="label">
                Comments
              </label>
              <input
                type="text"
                className="input"
                value={comment}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
                placeholder="Comments"
                id="comment"
                name="comment"
              />
            </div>
            <button type="submit" className="submit-btn">
              Add Review
            </button>
          </form>
        </div>
      </Modal>
      <div>
        Watched the movie? Want to add review to this?
        <button onClick={openModal}>Add Review</button>
      </div>
    </div>
  );
};

export default MovieDetails;
