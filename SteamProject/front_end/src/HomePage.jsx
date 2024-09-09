import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { apiData } from './api/Login.jsx';
import "./HomeStyle.css"

function HomePage() {
    const [SteamProfile, setSteamProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiData);
                const jsonData = await response.json();
                setSteamProfile(jsonData);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                navigate("/login");
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>An error as occured</p>
            ) : SteamProfile ? (
                <div className = "intro">
                    <div>
                    <h2 className='intro-inter'>{SteamProfile.personaname}</h2>
                    <img className='intro-inter'src={SteamProfile.avatarfull} alt="Avatar" />
                    </div>
                    <div className = "games">
                    </div>
                </div>
            ) : (
                <p>No profile data available</p>
            )}
        </div>
    );
}

export default HomePage;