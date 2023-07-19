import React from 'react';


const MoviePopup = ({ movie, onClose }) => {
    return (
        <div className="movie-popup">
            <div className="movie-popup-content">
            <h2>{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            <p>Type: {movie.Type}</p>
            {/* Add any other movie details you want to display */}
            <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};


export default MoviePopup;