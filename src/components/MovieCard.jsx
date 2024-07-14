import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div key={movie.id} className='bg-black text-white p-4 rounded-lg'>
      <h2 className='bg-red-900 p-2'>{movie.title}</h2>
      <p>{movie.release_date}</p>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className='w-48 h-auto'
      />
    </div>
  );
};

export default MovieCard;
