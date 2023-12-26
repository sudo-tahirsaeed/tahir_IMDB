import React from 'react';
import './moviecard.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
const MovieCard = ({ title, imageUrl }) => {
  const navigate = useNavigate();
  const handleCardClick=()=>{
   navigate('/movies/'+title)
  }
  return (
    <div onClick={handleCardClick} className="movie-card">
      <img src={imageUrl} alt={'Couldnt Load Image'} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
      </div>
    </div>
  );
};
export default MovieCard;
