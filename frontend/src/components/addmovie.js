import React, { useState,useContext } from 'react';
import axios from 'axios';
import './addmovie.css';
import Navbar from './Navbar';
import { UserContext } from '..//App';
import { useNavigate } from 'react-router-dom';
import {FidgetSpinner
} from 'react-loader-spinner';
const AddMovie = () => {
    const { ip, isAuth } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false)

  const [movieData, setMovieData] = useState({
    movieName: '',
    movieDescription: '',
    posterUrl: '',
  });
  const handleInputChange = (event) => {
    var { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };
  const handleAddMovie = () => {
    setisLoading(true)
    if(movieData.movieName && movieData.movieDescription && movieData.posterUrl)
    {
    axios.post(ip+'/addnewmovie', movieData)
      .then((response) => {
        if(response.status==200){
       alert('Movie Added Sucessfully!')
    navigate('/')    
    setisLoading(false)
    }
    if(response.status==201){
      setisLoading(false)
      alert('Sorry Movie with Similar name Already exists!')
    
     }
        
      })
      .catch((error) => {
        alert(error)
        console.error('Error adding movie:', error);
        setisLoading(false)
       
      });
    }
    else{
      setisLoading(false)
      alert('Please Fill All fields!')

    }
  };
  if(isLoading)
  {
    return(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <FidgetSpinner
type="dots" color="#0000ff" height={80} width={80} ></FidgetSpinner>
<h3>ADDING MOVIE...</h3>

  </div>
)
  }
  return (
    
    <div className='top'>
      <Navbar />
    <div className="add-movie-container">
      <h2 style={{ marginBottom: 20,
    fontSize: '1.5em',
    color: '#333'
    }}>Add New Movie</h2>
      {isAuth?
      (<form>
        <input
          type="text"
          name="movieName"
          placeholder="Movie Name"
          value={movieData.movieName}
          onChange={handleInputChange}
        />
        <textarea
          name="movieDescription"
          placeholder="Movie Description"
          value={movieData.movieDescription}
          onChange={handleInputChange}
          className='desc'
          max={3000}
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={movieData.posterUrl}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddMovie}>
          Add Movie
        </button>
      </form>)
:(
    <>
<h3 style={{color:'red'}}>Login first to add movie...! 🙇🏽‍♂️</h3>
  <button type="button" onClick={()=>{
    navigate('/login')
  }}>
 Login
</button>
</>
)
}
    </div>
    </div>
  );
};
export default AddMovie;
