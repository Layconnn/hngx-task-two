/* eslint-disable react/prop-types */
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/MovieCard.scss";
import { useState, useEffect } from "react";
import Api from "../Endpoints/api";

function MovieCard({ movie, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsClicked(storedFavorites.includes(movie.id));
  }, [movie.id]);

  const handleClick = () => {
    const mediaType = "movie";
    const mediaId = id;
    const favorite = !isClicked;

    Api.post(`/account/20428005/favorite`, {
      media_type: mediaType,
      media_id: mediaId,
      favorite: favorite,
    })
      .then(() => {
        setIsClicked(favorite);
        const storedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorite) {
          localStorage.setItem(
            "favorites",
            JSON.stringify([...storedFavorites, movie.id])
          );
        } else {
          const updatedFavorites = storedFavorites.filter(
            (itemId) => itemId !== movie.id
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
      })
      .catch((error) => {
        toast.error("unable to add to favourites");
        console.error("Error adding to favorites:", error);
      });
  };

  const getPosterUrl = (posterPath) => {
    if (!posterPath) return null;
    const trimmed = posterPath.trim();
    if (trimmed.toLowerCase() === "null" || trimmed === "") return null;
    let url = trimmed.startsWith("http")
      ? trimmed
      : `https://image.tmdb.org/t/p/w500/${trimmed}`;

    // Check if the computed URL equals a known bad URL
    if (
      url === "https://image.tmdb.org/t/p/w185null" ||
      url === "https://image.tmdb.org/t/p/w500null" ||
      url.includes("https://image.tmdb.org/t/p/w185https://image.tmdb.org/t/p/w185null")
    ) {
      return null;
    }
    return url;
  };

  const posterUrl = getPosterUrl(movie.poster_path);

  const fullReleaseDate = movie.release_date;
  const releaseYear = fullReleaseDate ? new Date(fullReleaseDate).getFullYear() : "N/A";

  return (
    <div data-testid="movie-card" className="box">
      <div>
        <Link to={`/movies/${movie.id}`}>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="poster"
              data-testid="movie-poster"
            />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </Link>

        <i
          className={`fa fa-heart icon ${isHovered ? "hovered" : ""} ${
            isClicked ? "clicked" : ""
          }`}
          alt="add movie to favourites"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        ></i>
        {isHovered && (
          <span className="tooltip">
            {isClicked ? "Remove from Favorites" : "Add to Favorites"}
          </span>
        )}
      </div>
      <h5 className="may">USA, {releaseYear}</h5>
      <h5 data-testid="movie-title" className="title">
        {movie.title}
      </h5>
      <div className="moses">
        <div className="rates">
          <img src="/im.png" alt="logo" />
          <p className="prees" data-testid="movie-rating">
            {movie.vote_average}/10
          </p>
        </div>
        <div className="rates">
          <img src="/to.png" alt="" />
          <p className="prees">0%</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MovieCard;
