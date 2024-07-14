import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";

function Home() {
  const [searchMovies, setSearchMovies] = useState("");
  const [movies, setMovies] = useState([]);
  const apiKey = '1bf5ead9bb0ad708a1b4daa0e93f9b33';

  const moviesFetch = async () => {
    if (searchMovies.trim()) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: searchMovies,
        },
      });
      setMovies(response.data.results || []);
    }
  };

  useEffect(() => {
    moviesFetch();
  }, [searchMovies]);

  return (
    <div className="bg-black text-white flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl mb-8">Welcome to Movie App</h1>
        <div className="w-full max-w-md">
          <SearchBar 
            searchMovies={searchMovies} 
            setSearchMovies={setSearchMovies} 
            onSearch={moviesFetch} 
          />
        </div>
      </div>
      <div className="w-full">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default Home;
