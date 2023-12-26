import React, { useState, useRef, useEffect, useContext } from 'react';
import './MovieDetails.css';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { UserContext } from '..//App';
import axios from 'axios';
import {
    FidgetSpinner
} from 'react-loader-spinner';

const MovieDetails = () => {
    const { ip, isAuth, setisAuth } = useContext(UserContext);
    const [isLoading, setisLoading] = useState(true)
    const { movieName } = useParams();
    const [rating, setRating] = useState(0);
    const [MovieData, setMovieData] = useState(null);
    const scrollableContainerRef = useRef(null);
    const [newComment, setNewComment] = useState('');
    const [refresh, setrefresh] = useState(false);
    const handleRatingChange = (newRating) => {
        if (!isAuth) {
            alert("Please Login First to Rate this movie!")
            return 0;
        }
        axios.post(ip + '/ratemovie', { movie: movieName, user: localStorage.getItem('email'), rating: newRating })
            .then((response) => {
                if (response.status == 200) {
                    alert("You have sucessfully rated this movie " + newRating + "/5")
                    setrefresh(!refresh)
                }
            })
            .catch((error) => {
                console.error('Error Rating Movie:', error);

            });
    };
    const handleCommentSubmit = () => {
        setNewComment('')
        if (newComment) {
            if (!isAuth) {
                alert("Please Login First to Comment on this movie!")
                return 0;
            }
            axios.post(ip + '/newcomment', { movie: movieName, user: localStorage.getItem('email'), comment: newComment }, {
                headers: {
                    authorization: `${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json',
                }
            }
            )
                .then((response) => {
                    if (response.status == 200) {
                        setrefresh(!refresh)
                        setTimeout(() => {
                            if (scrollableContainerRef.current) {
                                scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
                            }
                        }, 1000);
                    }
                    else {
                        alert('Cant add comment try logging in again!')
                    }
                })
                .catch((error) => {
                    console.error('Error Commenting on Movie:', error);
                    // Handle error scenarios
                });
        }
        else {
            alert("Please write something!")
        }
    };
    useEffect(() => {
        axios.post(ip + '/fetchmovie', { movieName: movieName })
            .then((response) => {
                setMovieData(response.data)
                setisLoading(false);
            })
            .catch((error) => {
                console.error('Error Fetching Movie Details:', error);
                setisLoading(false)
                alert(error)
                // Handle error scenarios
            })
        var authToken = localStorage.getItem('authtoken');
        if (authToken != null || authToken != '') {
            axios.post(ip + '/validateToken', { authToken })
                .then((response) => {
                    const { isAuth } = response.data;
                    if (isAuth) {
                        setisAuth(true)
                    }
                    setisLoading(false);
                })
                .catch((error) => {
                    console.error('Error validating token:', error);
                    setisLoading(false)
                    alert(error)
                    // Handle error scenarios
                });
        }
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, [refresh]);
    
    return (
        MovieData != null ? (
            <div>
                <Navbar />
                <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div className="movie-details">
                        {/* Poster and description */}
                        <div className="poster-container">
                            <img src={MovieData.movieInfo.posterurl} className="poster" />
                            <div className="description">
                                <h2>{MovieData.movieInfo.movieName}</h2>
                                <p style={{ textWrap: 'wrap' }}>{MovieData.movieInfo.movieDesc}</p>
                            </div>
                        </div>
                        {/* Rating */}
                        <div className="rating">
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <h2 style={{ color: 'white' }}>Overall Users Rating: </h2><h2 style={{ color: '#DB3A34', marginLeft: 7 }}>{MovieData.averageRating ? MovieData.averageRating : 'No Rating Yet'} ⭐ </h2>
                            </div>
                            <h3 style={{ color: 'white' }}>Rate this movie:</h3>
                            <div className="star-rating">
                                {[...Array(5)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleRatingChange(i + 1)}
                                        className={`star ${rating >= i + 1 ? 'active' : ''}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <h3 style={{ color: 'white' }}>Comments Section</h3>
                        {/* Comments */}
                        <div className="comments">
                            <div className="scrollable-container" ref={scrollableContainerRef} style={{ maxHeight: '300px', width: '100%', overflowY: 'scroll' }}>
                                {/* Content that might exceed 300px height */}
                                {MovieData.comments.map((comment) => (
                                    <div key={comment.comment + comment.email} className="comment">
                                        <h3 style={{ color: 'white', display: 'flex', flexDirection: 'row', }}>  <img style={{ height: 30, marginRight: 5, width: 30, borderRadius: 25 }} src='https://w7.pngwing.com/pngs/684/806/png-transparent-user-avatar-enter-photo-placeholder.png'>
                                        </img> {comment.email}</h3>
                                        <p>
                                            {comment.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="add-comment">
                                <textarea
                                    maxLength={200}
                                    disabled={!isAuth}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={isAuth ? "Add your comment" : "Login First To Add Comment"}
                                />
                                <button disabled={!isAuth} onClick={handleCommentSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
            : (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <FidgetSpinner
                type="dots" color="#0000ff" height={80} width={80} />
<h3>Just a moment...</h3>
        </div>)
    );
};
export default MovieDetails;