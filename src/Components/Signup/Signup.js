import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Login/Login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);
      const user = userCredentials.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      // Redirect to a different route after successful signup
      navigate('/popular'); // For example, navigate to the home page
    } catch (error) {
      console.log(error);
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <div>
            <button type="submit">Create Account</button>
         </div>
         
        </form>
        <div className="login-tab">
          <p>Need to Login?<Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
