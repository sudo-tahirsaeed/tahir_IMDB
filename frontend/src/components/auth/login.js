import React, { useState,useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import { UserContext } from '..//..//App';
import { useNavigate } from 'react-router-dom';
import {FidgetSpinner
} from 'react-loader-spinner';

const Login = () => {
  const {  setUser, ip,setuseremail } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const authenticateUser = async (email, password) => {
    setisLoading(true)
    if((email==null || email=='' ) || (password==null || password==''))
    {
      setisLoading(false)
      alert("Email or Password cant be empty !")
      return 0;
    }
    try {
      const response = await axios.post(ip+'/login', {
        email: email,
        password: password,
      });
      // Handle the response
      console.log(response.data.token); // Handle the response data as needed
      localStorage.setItem('authtoken', response.data.token);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('email', email);
      // Return or handle success
      setUser(response.data.user.name)
      setuseremail(response.data.user.email)
      setisLoading(false)
      return 1;
    } catch (error) {
      setisLoading(false)
      if(error.code==="ERR_BAD_REQUEST")
      {
        setisLoading(false)
        alert('Invalid Credentials!')
      }
      // Handle errors
      else{
        setisLoading(false)
    alert("Error Auth: "+error)
      }
      // Return or handle error
      
      return 0;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
   const check=await authenticateUser(email,password);
   if(check ===1){
    navigate('/');
   }
  };
  if(isLoading)
  {
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <FidgetSpinner
 type="dots" color="#0000ff" height={80} width={80} />
 <h3>Logging in...</h3>
    </div>
    )
  }
  return (
    <div style={loginStyles}>
      <div style={formStyles} className="login">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup style={{ marginBottom: '20px' }}>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="tahir@gmail.com"
              value={email}
              onChange={handleEmailChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '20px' }}>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </FormGroup>
          <Button type='submit' style={buttonStyles}>Login</Button>
          <Button onClick={()=>{navigate('/register')}} style={registerButtonStyles} >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};
const loginStyles = {
  height: '100vh',
  backgroundSize: 'cover',
  paddingTop: '60px',
  backgroundImage: 'url(https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1758&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const formStyles = {
  width: '350px',
  margin: '0 auto',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '40px',
  boxSizing: 'border-box',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
};
const buttonStyles = {
  width: '100%',
  padding: '12px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '6px',
};
const registerButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#AB3428',
  color: '#fff',
  transition: 'background-color 0.3s ease',
};
export default Login;
