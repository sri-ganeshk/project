import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import MovieCard from './MovieCard';

function Home() {
  const [searchMovies, setSearchMovies] = useState("");
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const apiKey = '1bf5ead9bb0ad708a1b4daa0e93f9b33';

  const moviesFetch = async () => {
    if (searchMovies.trim()) {
      const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: apiKey,
          query: searchMovies,
        },
      });
      setMovies(response.data.results || []);
    }
  };

  const fetchTopRatedMovies = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated", {
      params: {
        api_key: apiKey,
      },
    });
    setTopRatedMovies(response.data.results || []);
  };

  const fetchUpcomingMovies = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming", {
      params: {
        api_key: apiKey,
      },
    });
    setUpcomingMovies(response.data.results || []);
  };

  useEffect(() => {
    moviesFetch();
  }, [searchMovies]);

  useEffect(() => {
    fetchTopRatedMovies();
    fetchUpcomingMovies();
  }, []);

  return (
    <div className="bg-black text-white flex flex-col items-center min-h-screen px-4">
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-lg my-8">
          <SearchBar 
            searchMovies={searchMovies} 
            setSearchMovies={setSearchMovies} 
            onSearch={moviesFetch} 
          />
        </div>
      </div>

      <div className="w-full">
        {searchMovies ? (
          <MovieList movies={movies} />
        ) : (
          <>
            <div className="my-8 w-full">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center">Top Rated Movies</h2>
              <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex space-x-4">
                  {topRatedMovies.map(movie => (
                    <div key={movie.id} className="inline-block w-1/5">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="my-8 w-full">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center">Upcoming Movies</h2>
              <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex space-x-4">
                  {upcomingMovies.map(movie => (
                    <div key={movie.id} className="inline-block w-1/5">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

