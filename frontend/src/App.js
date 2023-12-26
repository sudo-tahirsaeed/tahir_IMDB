import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Dashboard from './components/dashboard';
import MovieDetails from './components/moviesDetails';
import AddMovie from './components/addmovie';
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setisAuth] = useState(false);
  const [useremail, setuseremail] = useState(null);
  const ip='http://localhost:3003'
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser,ip,useremail,setuseremail,isAuth,setisAuth }}>
        {/* Your navbar or other layout components */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/movies/:movieName" element={<MovieDetails />} />
          <Route path="/addmovie" element={<AddMovie />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;