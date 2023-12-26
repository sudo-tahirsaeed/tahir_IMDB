import React, { useState,useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '..//..//App';
import {FidgetSpinner
} from 'react-loader-spinner';

const Signup = () => {
  const [email, setEmail] = useState('');
  const { ip } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false)
  const [name, setname] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlenameChange = (event) => {
    setname(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    if(password.length<8)
{
  alert('Password Should be of at least 8 characters')
  return;
}

    try {
      setisLoading(true)
      const response = await axios.post(ip+'/register', { name, email, password });
      if(response.status==200)
      {
      alert('User registered successfully! Log in to your account now!');
      setname('');
      setEmail('');
      setPassword('');
      navigate('/login')
      setisLoading(false)
      }// Optionally, reset form fields after successful registration
      } catch (error) {
        setisLoading(false)
     

      if(error?.response?.data?.error=='Email already exists.')
      {
        alert('Email Already Exists !');
      }
      else{
        alert('No response from Server!! Try again!')
      }
    }
  };
  if(isLoading)
  {
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <FidgetSpinner
 type="dots" color="#0000ff" height={80} width={80} />
 <h3>Registration in process...</h3>
    </div>
    )
  }
  return (
    <div style={styles.root}>
      <div style={styles.loginContainer} className="login">
        <h1 style={styles.heading}>Register Here!</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Full Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Tahir Saeed"
              value={name}
              onChange={handlenameChange}
              style={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="tahir@gmail.com"
              value={email}
              onChange={handleEmailChange}
              style={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              style={styles.input}
            />
          </FormGroup>
          <Button style={{ ...styles.button, ...styles.signupButton }}>Signup</Button>
          <Button onClick={()=>{navigate('/login')}} style={{ ...styles.button, ...styles.registerButton }} className='register'>
            Already have account...
          </Button>
        </Form>
      </div>
    </div>
  );
};
const styles = {
  root: {
    height: '100vh',
    backgroundSize: 'cover',
    paddingTop: '60px',
    backgroundImage: 'url(https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1758&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '350px',
    margin: '0 auto',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    boxSizing: 'border-box',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '6px',
  },
  signupButton: {
    backgroundColor: '#B0DB43',
    color: '#000000',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#AB3428',
    color: '#fff',
  },
};
export default Signup;
