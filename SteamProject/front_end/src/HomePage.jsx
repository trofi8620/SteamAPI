import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { apiData, apiGame } from './api/Login.jsx';
import "./HomeStyle.css"

function HomePage() {
    const [SteamProfile, setSteamProfile] = useState(null);
    const [SteamGames, setSteamGames] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    var hasGames = false;

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

    useEffect(() => {
        
        const fetchGameData = async () => {
        try{
            const response = await fetch(apiGame);
            const jsonGames = await response.json()
            setSteamGames(jsonGames);
            hasGames = true;
        
        }
        catch(error){
            console.log(error)
        }
        };

        fetchGameData();
        console.log(hasGames)
    }, [])

    return (
        <>
        <div>
            {isLoading ? (
                <p>Loading...</p>) 
                : error ? (
                <p>An error as occured</p>) 
                : SteamProfile ? (
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
        
        <div>
            {hasGames ? 
            (<div className='games'>

            </div>) : 
            (<div>
                <h1>No games to display or account is private</h1>
            </div>)}
        
        
        </div>
        </>
    );
}

export default HomePage;