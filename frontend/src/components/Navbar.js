import React, { useState,useContext } from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { UserContext } from '..//App';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const {  setUser,setuseremail,isAuth,setisAuth } = useContext(UserContext);
  const navigate = useNavigate();
  const handleclick = (event) => {
    navigate('/')
  };
  const handlelogin = (event) => {
    navigate('/login')
  };
  const handlelogout = (event) => {
  localStorage.setItem('authtoken', null);
localStorage.setItem('name', null);
  localStorage.setItem('email', null);
setUser(null)
setuseremail(null)
navigate('/')
setisAuth(false)
alert("You Have Sucessfully Logout from this device!")
window.location.reload();
  };
  return (
    <nav className="navbar">
      <div onClick={handleclick} className="brand">
        <img
          height={30}
          width={250}
          style={{ marginRight: '10px' }}
          src={'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg'}
          alt="Movies Database Logo"
        />
        <h3>Movies Database</h3>
      </div>
      <div className="login-btn">
       {!isAuth ?<button onClick={handlelogin} className='login-button'  >Login</button> : 
       <>
       <h3 style={{ fontFamily: 'monospace' ,color:'#DDFFF7',fontSize:18}}>Welcome</h3>  
         <button onClick={handlelogout} >Logout</button>
         </>
      }
            </div>
    </nav>
  );
};
export default Navbar;