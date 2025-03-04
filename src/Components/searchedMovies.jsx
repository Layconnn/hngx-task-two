/* eslint-disable react/prop-types */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../Endpoints/api";
import "../Styles/MovieCard.scss";
import "../Styles/App.scss";

function SearchedMovies({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsClicked(storedFavorites.includes(movie.id));
  }, [movie.id]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    const mediaType = "movie";
    const mediaId = movie.id;
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
          toast.success("Added to favourites!📍");
          localStorage.setItem(
            "favorites",
            JSON.stringify([...storedFavorites, movie.id])
          );
        } else {
          const updatedFavorites = storedFavorites.filter(
            (id) => id !== movie.id
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          toast.error("Removed from favorites!");
        }
      })
      .catch((error) => {
        toast.error("Unable to add to favourites");
        console.error("Error adding to favorites:", error);
      });
  };

  const getPosterUrl = (posterPath) => {
    if (!posterPath) return null;
    const trimmed = posterPath.trim();
    if (trimmed.toLowerCase() === "null" || trimmed === "") return null;

    if (trimmed.startsWith("http")) {
      return trimmed === "https://image.tmdb.org/t/p/w185null" ? null : trimmed;
    }
    const url = `https://image.tmdb.org/t/p/w185${trimmed}`;
    return url === "https://image.tmdb.org/t/p/w185null" ? null : url;
  };

  const posterUrl = getPosterUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div data-testid="movie-card" key={movie.id} className="box">
      <div>
        <Link to={`/movies/${movie.id}`}>
          {posterUrl ? (
            <img
              src={posterUrl}
              data-testid="movie-poster"
              className="poster"
              alt={movie.title}
            />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </Link>
        {posterUrl ? (
          <>
            <i
              className={`fa fa-heart icon ${isHovered ? "hovered" : ""} ${
                isClicked ? "clicked" : ""
              }`}
              alt="add movie to favourites"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />
            {isHovered && (
              <span className="tooltip">
                {isClicked ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            )}
          </>
        ) : (
          ""
        )}
      </div>

      <h5 className="may">USA, {releaseYear}</h5>
      <h2 data-testid="movie-title" className="title">
        {movie.title}
      </h2>

      <div className="moses">
        <div className="rates">
          <img src="/im.png" alt="logo" />
          <p className="prees" data-testid="movie-rating">
            {movie.rating}/10
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

export default SearchedMovies;
