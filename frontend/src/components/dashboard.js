import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { UserContext } from '..//App';
import { useNavigate } from 'react-router-dom';
import {FidgetSpinner
} from 'react-loader-spinner';

import axios from 'axios'
import './dashboard.css'
const Dashboard = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate();
  const {  ip,setisAuth } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState(null);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    var authToken = localStorage.getItem('authtoken');
    localStorage.getItem('name');
    localStorage.getItem('email');
    // alert( localStorage.getItem('name'))
    if (authToken != null || authToken != '') {
      axios.post(ip + '/validateToken', { authToken })
        .then((response) => {
          const { isAuth } = response.data;
          if (isAuth) {
            setisAuth(true)
          }
        })
        .catch((error) => {
          console.error('Error validating token:', error);
          // Handle error scenarios
        });
    }
    axios.get(ip + '/getmovies')
      .then((response) => {
        const movies = response.data.movies;
        setMovies(movies)
        setisLoading(false)
      })
      .catch((error) => {
        setisLoading(false)
        alert(error)
        console.error('Error Getting Movies:', error);
       
        // Handle error scenarios
      });
    return () => {
    };
  }, []);
  if(isLoading)
  {
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <FidgetSpinner
 type="dots" color="#0000ff" height={80} width={80} />
 <h3>Loading Dashboard...</h3>
    </div>
    )
  }
  return (
   
    <div className='top1'>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
        <div className="search-box" >
          <input
            type="text"
            placeholder="Search Movies"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
      <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {searchQuery !== null && searchQuery !== '' ? (
          (() => {
            const filteredMovies = movies.filter(movie => {
              const searchInput = searchQuery.toLowerCase();
              const movieTitle = movie.movieName.toLowerCase();
              return movieTitle.includes(searchInput);
            });
            if (filteredMovies.length === 0) {
              return <div style={{ color: 'black',  textAlign: 'center', justifyContent: 'center', alignContent: 'center', borderRadius: 15, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
              <p style={{ fontWeight: '600',backgroundColor:'#E63B2E',padding:18,borderRadius:10,color:'#1F1300', fontSize: 35, margin: 'auto' }}>
                Sorry no results for "{searchQuery}"
              </p>
            </div>
            }
            return filteredMovies.map((movie, index) => (
              <MovieCard key={index} title={movie.movieName} imageUrl={movie.posterurl}></MovieCard>
            ));
          })()
        ) : (
          movies.map((movie, index) => (
            <MovieCard key={index} title={movie.movieName} imageUrl={movie.posterurl}></MovieCard>
          ))
        )}
      </div>
      {/* Other content */}
       {/* Floating button */}
       <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <button onClick={()=>{navigate('/addmovie')}}className='add-movie-button' >
          <span style={{ marginRight: 8 }}>+</span>
          <span>Add New Movie</span>
        </button>
      </div>
    </div>

    
  );
};
export default Dashboard;
