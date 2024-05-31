import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Form, Card, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaSearch } from 'react-icons/fa';
import '../App.css';
import './Navbar.css';

function CollapsibleExample() {
  const API_SEARCH = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "e2abee6c8ed2414f5b23970f331d7cd8";

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSearchResults([]);
  }, [location.pathname]);

  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
    if (search.trim() !== "") {
      try {
        const response = await axios.get(`${API_SEARCH}?api_key=${API_KEY}&query=${search}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
    setShowModal(false);
  };

  const handleCardClick = () => {
    setSearchResults([]);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/popular");
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="main1">
      <Navbar>
        <Container>
          <Link to="/popular" style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{ color: 'red' }}>Filmyverse</Navbar.Brand>
          </Link>
          
          
          
        
            
            {user ? (
              <div className="d-flex align-items-center ms-auto"><Nav.Link onClick={() => setShowModal(true)}>
              <FaSearch size={20} />
            </Nav.Link>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>{user.email}</Tooltip>}
                >
                  <div className="profile-pic">
                    {getInitials(user.email)}
                  </div>
                </OverlayTrigger>
                <Button onClick={handleLogout} variant="danger" >Logout</Button>
              </div>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          
        </Container> 
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Wanna Explore!"
              aria-label="Search"
              value={search}
              onChange={changeSearch}
            />
            <Button type='submit' className="mt-2">Search</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="main">
        <div className="main2">
          {searchResults.map((result) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${result.id}`}
              onClick={handleCardClick}
              key={result.id}
            >
              <Card border="danger" style={{ width: '15rem' }}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt={result.title}
                  height={'240rem'}
                />
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollapsibleExample;
