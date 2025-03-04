import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../Pages/App";
import NoPage from "../Pages/noPage";
import MovieDetails from "../Pages/movieDetails";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movies/:movie_id" element={<MovieDetails />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
