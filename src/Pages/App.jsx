import "../Styles/App.scss";
import Api from "../Endpoints/api";
import MovieCard from "../Components/movieCard";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/MovieCard.scss";
import SearchedMovies from "../Components/searchedMovies";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [setBackgroundImage] = useState("");
  const [mainMovie, setMainMovie] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchTop12RatedMovies = async () => {
      try {
        const res = await Api.get("/movie/top_rated?language=en-US&page=1");
        const top12Movies = res.data.results.slice(0, 12);
        setTopRatedMovies(top12Movies);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load top rated movies");
      }
    };

    fetchTop12RatedMovies();
  }, [setBackgroundImage]);

  useEffect(() => {
    const fetchNowPlayingMovie = async () => {
      try {
        const res = await Api.get(
          "/search/movie?query=wick&include_adult=false&language=en-US&page=1"
        );
        setMainMovie(res.data.results.slice(1, 2));

        if (res.data.results && res.data.results.length > 0) {
          const firstMovie = res.data.results[1];
          const backdropPath = firstMovie.backdrop_path;
          if (backdropPath) {
            setBackgroundImage(
              `https://image.tmdb.org/t/p/original${backdropPath}`
            );
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load John Wick");
      }
    };
    fetchNowPlayingMovie();
  }, [setBackgroundImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await Api.get(
        `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      );

      const movieData = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
        overview: movie.overview,
        rating: movie.vote_average,
      }));

      if (movieData.length === 0) {
        toast.error("No movie found 😢");
      } else {
        toast.success("Movie found! 😎");
      }
      setMovies(movieData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to search movie, API down!");
    } finally {
      setQuery("");
      setIsLoading(false);
    }
  };

  const getDivStyle = () => {
    return {
      width: "100%",
      height: "600px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: "url('/wick.png')",
    };
  };

  const divStyle = getDivStyle();

  return (
    <>
      <div>
        <div className="meg">
          {mainMovie?.map((main) => (
            <div data-testid="movie-poster" key={main.id} style={divStyle}>
              <div className="main-search">
                <div className="before">
                  <img src="/yagga.png" className="mates" alt="" />
                  <img src="/men.png" className="mates" alt="" />
                </div>
                <img src="/yagga.png" alt="John Wick" className="movie-box" />
                <form className="rah" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="what do you want to watch?"
                    className="search-bar"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="active">
                    <i className="fa fa-search mee"></i>
                  </button>
                </form>
                <img src="/men.png" className="movie-box" alt="" />
              </div>
              <p className="shark" data-testid="movie-title">
                John Wick 3: Parabellum
              </p>
              <div className="dimi">
                <div className="rates">
                  <img src="/im.png" alt="logo" />
                  <p className="pree" data-testid="movie-rating">
                    {main.vote_average}/10
                  </p>
                </div>
                <div className="rates">
                  <img src="/to.png" alt="" />
                  <p className="pree">0%</p>
                </div>
              </div>
              <p data-testid="movie-overview" className="over">
                {main.overview}
              </p>
              <div className="watch">
                <img src="/play.png" alt="" />
                <p className="yaga">WATCH TRAILER</p>
              </div>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="skeleton-container">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="skeleton-card"></div>
            ))}
          </div>
        ) : hasSearched ? (
          <>
            <h1 className="header">Searched Movies:</h1>
            {movies.length > 0 ? (
              <div className="movie-card">
                {movies.map((movie) => (
                  <SearchedMovies key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="no-movie-found">No movie found</div>
            )}
          </>
        ) : (
          <>
            <h1 className="header">Featured movies</h1>
            <div className="movie-card">
              {topRatedMovies.map((movie) => (
                <MovieCard key={movie.id} id={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
