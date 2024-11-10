import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './axios/usersAPI';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const LoginPage = () => {
  const [UserId, setUserId] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const checkLogin = async () => {
    await login(UserId, Password).then(response => {
      console.log("response in login", response);
      if (response.data.statusCode === 200) {
        alert('welcome:)')
        localStorage.setItem("userId", UserId)
        navigate("/calendar", { replace: false });
      }
      else {
        alert('The user does not exist. Please register to the system first')

        navigate("/register", { replace: false });
      }
    })
  }
  const register = () => {
    navigate("/register");
  }
  return (
    <div className='center'>
     <br/>
      <h1 style={{ color: 'purple', marginTop:'50%'}}>Login to the system</h1>
      <TextField
        color="secondary" focused
        label="UserId"
        value={UserId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <br />
      <br />
      <TextField
        color="secondary" focused
        label="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <br />
      <Button variant="outlined" color="secondary" onClick={checkLogin} >enter</Button>
    </div>
  );
}


export default LoginPage;