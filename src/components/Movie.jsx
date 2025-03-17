import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addFavoriteMovie } from '../api'; // Import the API call

const Movie = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]); // State for movie reviews
  const [visibleReviews, setVisibleReviews] = useState(2); // State to control visible reviews

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '1bf5ead9bb0ad708a1b4daa0e93f9b33';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: apiKey,
            append_to_response: 'credits,videos,watch/providers',
          },
        });
        setMovieDetails(response.data);

        // Fetch recommendations
        const recommendationsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
          params: { api_key: apiKey },
        });
        setRecommendations(recommendationsResponse.data.results);

        // Fetch reviews
        const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
          params: { api_key: apiKey },
        });
        setReviews(reviewsResponse.data.results);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      console.log('Adding movie ID:', id); // Log movie ID
      await addFavoriteMovie(id);  // Send the request to add movie to favorites
      alert('Movie added to favorites!');
    } catch (err) {
      // Check if the error response has a specific message for already added movies
      const errorMessage = err.response?.data?.message || 'Failed to add movie to favorites.';
      if (errorMessage === 'Movie already in favorites') {
        alert('This movie is already in your favorites!');
      } else {
        alert(errorMessage);
      }
      console.error('Error adding movie to favorites:', err.response?.data || err);
    }
  };

  if (!movieDetails) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const director = movieDetails.credits.crew.find(person => person.job === 'Director');
  const cast = movieDetails.credits.cast;
  const trailer = movieDetails.videos.results.find(video => video.type === 'Trailer');
  const rating = movieDetails.vote_average; // Get the rating
  const stars = Math.round(rating / 2); // Convert to a 5-star scale
  const getWikipediaLink = (name) => {
    const formattedName = name.split(' ').join('_');
    return `https://en.wikipedia.org/wiki/${formattedName}`;
  };

  const fallbackImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  // Function to handle avatar URLs
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return fallbackImage;
    if (avatarPath.startsWith('/https')) {
      return avatarPath.replace('/https', 'https');
    }
    return `https://image.tmdb.org/t/p/w500${avatarPath}`;
  };

  const handleReadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2);
  };

  return (
    <div className="md:ml-0 py-20">
      <div className="relative h-auto md:h-[82vh] flex justify-center">
        <div className="h-full w-full shadowbackdrop absolute"></div>
        <h1 className="text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center">
          {movieDetails.title}
        </h1>
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Movie Rating */}
      <div className="flex justify-center items-center mt-5">
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-6 h-6 ${index < stars ? 'text-yellow-400' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049.867L7.527 6.317H2.3L6.18 9.013 4.664 14.567 9.049 11.608 13.436 14.567 11.92 9.013 15.799 6.317h-5.226L9.049.867z" />
            </svg>
          ))}
          <p className="text-white text-lg">{rating.toFixed(1)}/10</p>
        </div>
      </div>

      {/* Movie Overview */}
      <h2 className="text-white text-center pt-5 px-3 md:px-60 font-Roboto text-[18px]">
        {movieDetails.overview}
      </h2>

      {/* Release Date */}
      <div className="text-blue-100 font-semibold my-3 flex justify-center">
        <h2 className="bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full">
          Release Date: {movieDetails.release_date}
        </h2>
      </div>

      {/* Genres */}
      <div className="flex justify-center flex-wrap">
        {movieDetails.genres.map((genre) => (
          <div
            key={genre.id}
            className="text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2"
          >
            {genre.name}
          </div>
        ))}
      </div>

      {/* Director and Cast */}
      <div className="flex flex-col items-center">
        {/* Director */}
        <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">Director</h1>
        {director && (
          <div className="text-white text-center my-3">
            <a
              href={getWikipediaLink(director.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1 cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
                alt={director.name}
                onError={(e) => { e.target.src = fallbackImage; }}
                className="w-full h-[14rem] object-cover rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
              <p className="text-white mt-2">{director.name}</p>
            </a>
          </div>
        )}

        {/* Cast */}
        <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">Cast</h1>
        <div className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
          {cast.map((member) => (
            <a
              key={member.cast_id}
              href={getWikipediaLink(member.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1 cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                alt={member.name}
                onError={(e) => { e.target.src = fallbackImage; }}
                className="w-full h-[14rem] object-cover rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
              <p className="text-white mt-2">{member.name}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex border-2 border-red-600 bg-red-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
            </svg>
            Watch Trailer
          </a>
        )}
        <a
          href={`/player/${id}/${movieDetails.title.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex border-2 border-green-600 bg-green-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
          </svg>
          Watch Movie
        </a>
      </div>

      <div className="my-10">
        <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">Recommended Movies</h1>
        <div className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
          {recommendations.length > 0 ? (
            recommendations.map((movie) => (
              <a
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1 cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  onError={(e) => { e.target.src = fallbackImage; }}
                  className="w-full h-[20rem] max-w-[14rem] object-cover rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <p className="text-white mt-2">{movie.title}</p>
              </a>
            ))
          ) : (
            <p className="text-white text-center">No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
