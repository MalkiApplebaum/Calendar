import React, { useState } from 'react';
import { register } from './axios/usersAPI';
import { User } from './models/User';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegistrationPage = () => {
  const [UserId, setUserId] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');

  const navigate = useNavigate();

  const registerUser = () => {
    const user = new User();
    user.UserId = UserId
    user.FirstName = FirstName
    user.LastName = LastName
    user.Email = Email
    user.Phone = Phone
    user.Password = Password
    register(user)
    localStorage.setItem("userId", UserId)
    navigate("/calendar", { replace: false });
  }

  return (
    <div className='center'>
      <h1 style={{ color: 'purple' }}>register to the system</h1>
      <label htmlFor="UserId">UserId:</label>
      <TextField
        size='small'
        color="secondary" focused
        value={UserId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <br />

      <label htmlFor="FirstName">FirstName:</label>
      <TextField
        size='small'
        color="secondary" focused
        value={FirstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <br />


      <label htmlFor="LastName">LastName:</label>

      <TextField
        size='small'
        color="secondary" focused
        value={LastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <br />

      <label htmlFor="Email">Email:</label>

      <TextField
        size='small'
        color="secondary" focused
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />

      <label htmlFor="Phone">Phone</label>

      <TextField
        size='small'
        color="secondary" focused
        value={Phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <br />

      <label htmlFor="Password">Password:</label>
      <TextField
        size='small'
        color="secondary" focused
        type="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <Button variant="outlined" color="secondary" onClick={registerUser} >register</Button>
    </div>
  );
}

export default RegistrationPage;
