const express = require('express');
const router = express.Router();
const pool = require('../databaseconfig/db');
const jwt = require('jsonwebtoken');
const generateToken = (payload) => {
    // Replace 'YOUR_SECRET_KEY' with your own secret key
    const secretKey = 'ppumak47';
    const mypayload = {
        data: payload
    }; // Or a more complex object
    // Set token expiration (optional)
    const expiresIn = '1d'; // Token expires in 1 hour (you can change this as needed)
    // Create the JWT token with the payload and secret key
    const token = jwt.sign(mypayload, secretKey, {
        expiresIn
    });
    return token;
};
function authenticateToken(request, response, next) {
    // Get the authorization header from the request
    const authHeader = request.headers.authorization;
    // If authorization header is missing, return unauthorized status
    if (typeof authHeader === 'undefined') {
        return response.sendStatus(401); // Unauthorized
    }
    // Verify the JWT token from the authorization header
    jwt.verify(authHeader, "ppumak47", (err, decodedToken) => {
        if (err) {
            return response.sendStatus(403); // Forbidden
        }
        // If token is verified, set the user data in the request and call next middleware
        request.user = decodedToken;
        next();
    });
}
router.get('/', (req, res) => {
    // Handle the root route '/'
    res.send('Hi from Tahir IMDB');
});
router.post('/register', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            error: 'Please fill all fields.'
        });
    }
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error connecting to database');
        }
        // Use parameterized queries to prevent SQL injection
        connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            // Release the connection back to the pool
            if (error) {
                return res.status(500).send('Error querying database');
            }
            if (results.length > 0) {
                // User found, send a success response or user data
                return res.status(400).json({
                    error: 'Email already exists.'
                });
            } else {
                connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
                    if (error) {
                        return res.status(500).send('Error querying database');
                    } else {
                        return res.status(200).json({
                            message: 'Registration Successful'
                        });
                    }
                })
            }
            connection.release();
        });
    });
});
router.post('/addnewmovie', (req, res) => {
    const {
        movieName,
        movieDescription,
        posterUrl
    } = req.body;
    if (!posterUrl || !movieName || !movieDescription) {
        return res.status(400).json({
            error: 'Please fill all fields.'
        });
    }
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error connecting to database');
        }
        // Use parameterized queries to prevent SQL injection
        connection.query('SELECT * FROM movies WHERE movieName = ?', [movieName], (error, results) => {
            // Release the connection back to the pool
            if (error) {
                return res.status(500).send('Error querying database');
            }
            if (results.length > 0) {
                // User found, send a success response or user data
                return res.status(201).json({
                    error: 'Movie already exists.'
                });
            } else {
                connection.query('INSERT INTO movies (movieName, movieDesc, posterurl) VALUES (?, ?, ?)', [movieName, movieDescription, posterUrl], (error, results) => {
                    if (error) {
                        return res.status(500).send('Error querying database');
                    } else {
                        return res.status(200).json({
                            message: 'Movie Added Sucessfully'
                        });
                    }
                })
            }
            connection.release();
        });
    });
});
router.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error connecting to database');
        }
        // Use parameterized queries to prevent SQL injection
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
            connection.release(); // Release the connection back to the pool
            if (error) {
                return res.status(500).send('Error querying database');
            }
            if (results.length > 0) {
                // User found, send a success response or user data
                res.json({
                    message: 'Login successful',
                    user: results[0],
                    token: generateToken(req.body.email)
                });
            } else {
                // User not found or invalid credentials
                res.status(401).send('Invalid credentials');
            }
        });
    });
});
router.post('/validateToken', (req, res) => {
    const authToken = req.body.authToken; // Get the auth token from the request body
    // Verify the received token
    jwt.verify(authToken, 'ppumak47', (err, decoded) => {
        if (err) {
            return res.status(403).json({
                isAuth: false
            }); // Token verification failed
        }
        return res.status(200).json({
            isAuth: true
        }); // Token verification failed
    });
})
router.get('/getmovies', (req, res) => {
    const {
        email,
        password
    } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error connecting to database');
        }
        // Use parameterized queries to prevent SQL injection
        connection.query('SELECT * FROM movies', (error, results) => {
            connection.release(); // Release the connection back to the pool
            if (error) {
                return res.status(500).send('Error querying database');
            }
            if (results.length > 0) {
                res.json({
                    movies: results
                });
            } else {
                // User not found or invalid credentials
                res.status(401).send('No Movies Found!');
            }
        });
    });
});
router.post('/fetchmovie', async (req, res) => {
    try {
        const {
            movieName
        } = req.body;
        // Get details from movies table
        const moviesQuery = `SELECT * FROM movies WHERE movieName = ?`;
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(500).send('Error connecting to database');
            }
            connection.query(moviesQuery, [movieName], (error, moviesResult) => {
                connection.release();
                if (error) {
                    return res.status(500).send('Error querying movies database');
                }
                if (moviesResult.length > 0) {
                    const avgRatingQuery = `SELECT AVG(rating) AS averageRating FROM reviews WHERE movieName = ?`;
                    connection.query(avgRatingQuery, [movieName], (avgError, avgRatingResult) => {
                        if (avgError) {
                            return res.status(500).send('Error querying average rating');
                        }
                        const reviewsQuery = `SELECT * FROM reviews WHERE movieName = ?`;
                        connection.query(reviewsQuery, [movieName], (reviewError, reviewsResult) => {
                            if (reviewError) {
                                return res.status(500).send('Error querying reviews');
                            }
                            const commentsQuery = `SELECT email,comment FROM comments WHERE movieName = ?`;
                            connection.query(commentsQuery, [movieName], (commentError, commentsResult) => {
                                if (commentError) {
                                    return res.status(500).send('Error querying comments');
                                }
                                const movieDetails = {
                                    movieInfo: moviesResult[0],
                                    averageRating: avgRatingResult[0].averageRating || null,
                                    reviews: reviewsResult,
                                    comments: commentsResult,
                                };
                                res.status(200).json(movieDetails);
                            });
                        });
                    });
                } else {
                    res.status(401).send('No Movies Found!');
                }
            });
        });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({
            error: 'Error fetching movie details'
        });
    }
});
router.post('/ratemovie', async (req, res) => {
    try {
        const {
            movie,
            user,
            rating
        } = req.body;
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(500).send('Error connecting to database');
            }
            // Use parameterized queries to prevent SQL injection
            connection.query('SELECT * FROM reviews WHERE movieName = ? AND email = ?', [movie, user], (error, results) => {
                if (error) {
                    return res.status(500).send('Error querying database');
                }
                if (results.length > 0) {
                    connection.query('UPDATE reviews SET rating = ? WHERE movieName = ? AND email = ?', [rating, movie, user], (error, results) => {
                        if (error) {
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(200)
                        }
                    })
                } else {
                    connection.query('INSERT INTO reviews (movieName, email, rating) VALUES (?, ?, ?)', [movie, user, rating], (error, results) => {
                        if (error) {
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(200)
                        }
                    })
                }
            });
            connection.release();
        });
    } catch (error) {
        console.error('Error Rating Movie:', error);
        res.status(500).json({
            error: 'Error rating the movie'
        });
    }
});
router.post('/newcomment', authenticateToken, async (req, res) => {
    try {
        const {
            movie,
            user,
            comment
        } = req.body;
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(500).send('Error connecting to database');
            }
            // Use parameterized queries to prevent SQL injection
            connection.query('INSERT INTO comments (movieName, email, comment) VALUES (?, ?, ?)', [movie, user, comment], (error, results) => {
                if (error) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200)
                }
            });
            connection.release();
        });
    } catch (error) {
        console.error('Error Commenting on Movie:', error);
        res.status(500).json({
            error: 'Error Commenting the movie'
        });
    }
});
module.exports = router;