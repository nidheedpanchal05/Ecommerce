import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Sign.css';
import { useFetch } from '../components/useFetch';

const url = 'http://127.0.0.1:8000/seller/';

const SignIn = () => {
  const history = useHistory();
  const { items } = useFetch(url);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('login')) {
      let retrivedData = JSON.parse(localStorage.getItem('login'));
      console.log(retrivedData.seller_name);
      history.push(`/seller/${retrivedData.seller_name}`);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = items.find((seller) => seller.email === email);
    if (email && password) {
      if (existingUser && existingUser.email && existingUser.seller_password) {
        if (existingUser.email === email) {
          if (existingUser.seller_password === password) {
            history.push('/seller');
            localStorage.setItem('login', JSON.stringify(existingUser));
            window.location.reload(true);
          } else {
            alert('Password Invalid');
          }
        }
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  return (
    <div className='userForm'>
      <form className='signinForm' onSubmit={(e) => handleSubmit(e)}>
        <h1 className='header'>Sign In</h1>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <button className='form-btn' type='submit'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
