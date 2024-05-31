import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FaBars } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";
import { IoStarOutline, IoPeopleOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ColorMode from './ColorMode'; 
import actionIcon from '../../assets/action.png';
import adventureIcon from '../../assets/adventure.png';
import animationIcon from '../../assets/animation.png';
import comedyIcon from '../../assets/comedy.png';
import crimeIcon from '../../assets/crime.png';
import documentaryIcon from '../../assets/documentary.png';
import dramaIcon from '../../assets/drama.png';
import familyIcon from '../../assets/family.png';
import fantasyIcon from '../../assets/fantasy.png';
import historyIcon from '../../assets/history.png';
import horrorIcon from '../../assets/horror.png';
import musicIcon from '../../assets/music.png';
import mysteryIcon from '../../assets/mystery.png';
import romanceIcon from '../../assets/romance.png';
import sciFiIcon from '../../assets/science fiction.png';
import thrillerIcon from '../../assets/thriller.png';
import warIcon from '../../assets/war.png';
import westernIcon from '../../assets/western.png';
import tvMovieIcon from '../../assets/tv movie.png';

const genreIcons = {
    Action: actionIcon,
    Adventure: adventureIcon,
    Animation: animationIcon,
    Comedy: comedyIcon,
    Crime: crimeIcon,
    Documentary: documentaryIcon,
    Drama: dramaIcon,
    Family: familyIcon,
    Fantasy: fantasyIcon,
    History: historyIcon,
    Horror: horrorIcon,
    Music: musicIcon,
    Mystery: mysteryIcon,
    Romance: romanceIcon,
    'Science Fiction': sciFiIcon,
    'TV Movie': tvMovieIcon,
    Thriller: thrillerIcon,
    War: warIcon,
    Western: westernIcon
};

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [genres, setGenres] = useState([]);
    const [mode, setMode] = useState('light'); // State to manage mode
    const [brandColor, setBrandColor] = useState('black'); // State to manage brand color
    const [initialsColor, setInitialsColor] = useState({
        color: 'white',
        backgroundColor: 'black'
    }); // State to manage initials color
    const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState('white'); // State to manage sidebar background color
    const API_KEY = "e2abee6c8ed2414f5b23970f331d7cd8";

    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/popular",
            name: "Popular",
            icon: <IoStarOutline />
        },
        {
            path: "/top_rated",
            name: "TopRated",
            icon: <IoPeopleOutline />
        },
        {
            path: "/now_playing",
            name: "NowPlaying",
            icon: <CiPlay1 />
        },
        {
            path: "/upcoming",
            name: "Upcoming",
            icon: <FaDisplay />
        }
    ];

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    const handleModeChange = (newMode) => {
        setMode(newMode);
        // Set brand color and initials color based on the mode
        setBrandColor(newMode === 'dark' ? 'white' : 'black');
        setInitialsColor({
            color: newMode === 'dark' ? 'black' : 'white',
            backgroundColor: newMode === 'dark' ? 'white' : 'black'
        });

        // Set sidebar background color based on the mode
        setSidebarBackgroundColor(newMode === 'dark' ? 'black' : 'white');
    };

    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px", backgroundColor: sidebarBackgroundColor }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none", color: brandColor }} className="logo">FV</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} style={{ color: brandColor }} /> {/* Icon with dynamic color */}
                    </div>
                    <ColorMode onModeChange={handleModeChange} /> {/* ColorMode component for mode switching */}
                </div>
                <div className="menu_section">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon" style={{ filter: mode === 'dark' ? 'invert(1)' : 'invert(0)' }}>{item.icon}</div> {/* Icon with dynamic color */}
                            <div style={{ display: isOpen ? "block" : "none", color: brandColor }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))}
                </div>
                <div className="genre_section">
                    {genres.map((genre) => (
                        <NavLink to={`/genre/${genre.id}`} key={genre.id} className="link" activeClassName="active">
                            <img 
                                src={genreIcons[genre.name]} 
                                alt={`${genre.name} icon`} 
                                style={{ 
                                    display: "inline", 
                                    filter: mode === 'dark' ? 'invert(1)' : 'invert(0)',
                                    display: isOpen ? "inline" : "block", // Show as block when closed
                                    margin: isOpen ? "0" : "auto" // Center the icon when closed
                                }} 
                                height={30} 
                            />
                            <div className="link_text" style={{ display: isOpen ? "block" : "none", color: brandColor }}>{genre.name}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
