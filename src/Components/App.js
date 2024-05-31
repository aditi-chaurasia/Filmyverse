// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Logout from './Logout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import MovieDetails from './MovieDetails/MovieDetails';
import Movielist from './Movielist';
import Sidebar from './Sidebar/Sidebar';
import GenreMovies from './GenreMovie';
import Popular from './Popular'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

 
function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const authenticated = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsFetching(false);
    });


    return () => authenticated();
  }, []);

  if (isFetching) {
    return  (<div style={{ padding: '20px' }}>
    <Skeleton height={40} width={300} />
    <Skeleton count={10} />
  </div>);
  }

  return ( 
    <BrowserRouter>
     {user && <Navbar />}
      {user && <Sidebar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={user ? <Popular /> : <Navigate to="/login" />}/>
        <Route path="/:type" element={user ? <Movielist /> : <Navigate to="/login" />} />
        {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
        <Route path="/movie/:id" element={user ? <MovieDetails /> : <Navigate to="/login" />} />
        <Route path="/movie/:genre_name" element={<MovieDetails />} />
        <Route path="/genre/:genreId" element={<GenreMovies />} />

      </Routes>
    </BrowserRouter>    
  );
}

export default App;
