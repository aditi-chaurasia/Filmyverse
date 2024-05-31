import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential)
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/"); // Redirect after successful login
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <div className="signup-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Your Email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <button type="submit">Login</button>
                    
                </form>
                <div className="login-tab">
                    <p>Need to Signup?<Link to="/signup">Create Account</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
