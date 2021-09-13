import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFetch } from '../components/useFetch';
import '../styles/Sign.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const url = 'http://127.0.0.1:8000/seller/';

const SignUp = () => {
  const history = useHistory();
  const { loading, items } = useFetch(url);
  const sellers = items;
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [contact, setContact] = useState('');
  const [company, setCompany] = useState('');
  const [next, setNext] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = sellers.find((seller) => seller.email === email);
    if (existingUser) {
      if (!toast.isActive('email')) {
        toast("We're Sorry. An account with this email already exists !", {
          toastId: 'email',
        });
      }
    } else {
      if (password && repassword) {
        if (password === repassword) {
          const data = {
            seller_name: sname,
            email: email,
            contact: contact,
            company_name: company,
            seller_password: password,
            status: 'Active',
          };

          console.log(data);
          axios
            .post(url, data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          localStorage.setItem('seller-info', JSON.stringify(data));

          alert('Congratulations');
          setSname('');
          setEmail('');
          setContact('');
          setCompany('');
          setPassword('');
          setRePassword('');
          setNext(false);
        } else {
          alert('Password and Re-entered should match');
        }
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('seller-info')) {
      history.push('/signin');
    }
  }, []);

  const handleNext = () => {
    if (sname && email && contact && company) {
      setNext(true);
    } else if (!toast.isActive('form-incomplete')) {
      toast('Please fill all the details', {
        toastId: 'form-incomplete',
      });
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <h4 className='header'>OOps...</h4>
          Something went wrong. Try again Later
        </div>
      ) : (
        <div className='userForm'>
          <h1 className='header'>Create Your Seller Account</h1>
          <form className='signup-form' onSubmit={(e) => handleSubmit(e)}>
            {next ? (
              <div>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                  title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Set Password'
                  required
                />
                <label htmlFor='repassword'>Password</label>
                <input
                  type='repassword'
                  name='repassword'
                  value={repassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder='Re-Enter Password'
                  required
                />
                <br />
                <button
                  className='form-btn'
                  type='button'
                  onClick={() => setNext(false)}
                >
                  Back
                </button>
                <button className='form-btn' type='submit'>
                  Sign Up
                </button>
                <ToastContainer
                  position='top-center'
                  autoClose={7000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  bodyClassName='toastBody'
                  progressClassName='toastProgress'
                />
                <p className='passwd-strength'>
                  Password must contain : A lowercase letter, a Capital
                  (Uppercase) Letter, A number, Minimum 8 characters
                </p>
              </div>
            ) : (
              <div>
                <label htmlFor='sname'>Name</label>
                <input
                  type='text'
                  name='sname'
                  value={sname}
                  onChange={(e) => setSname(e.target.value)}
                  placeholder='Full Name'
                  required
                />
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email Address'
                  required
                />
                <label htmlFor='contact'>Contact Number</label>
                <input
                  type='tel'
                  name='contact'
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder='Contact Number'
                />
                <label htmlFor='company'>Company</label>
                <input
                  type='text'
                  name='company'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder='Company / Firm / Your Name'
                />
                <br />
                <button className='form-btn' type='button' onClick={handleNext}>
                  Proceed
                </button>
                <ToastContainer
                  position='top-center'
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  progressClassName='toastProgress'
                />
              </div>
            )}
          </form>
          <hr />
          <h4 style={{ textAlign: 'center' }}>
            Already a Seller? <Link to='/signin'>Sign In</Link>
          </h4>
        </div>
      )}
    </>
  );
};

export default SignUp;
