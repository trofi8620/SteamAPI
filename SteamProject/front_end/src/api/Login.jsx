import {React, useState, useRef} from "react"
import { useNavigate } from "react-router-dom";
export let ID;
export let apiData;
export let apiGame;

function Login() {
    const [ID, setID] = useState("");
    const navigate = useNavigate();
    const errorRef = useRef(null);
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            
            const response = await fetch(`http://localhost:3000/steam-profile/${ID}`);
            const data = await response.json();
            if (response.ok) {
                console.log('Data responded okay');
                apiData = `http://localhost:3000/steam-profile/${ID}`;
                navigate('/HomePage');
                
            } else {
                console.log(data.error);
                errorRef.current.innerHTML = '<strong>User not found</strong>';
                
            }
        } catch (error) {
            
            console.error('Error:', error);
        }

        try{

            const response = await fetch(`http://localhost:3000/steam-profile/${ID}/games`);
            const games = await response.json();
            if(response.ok){
                console.log('Games responded okay');
                apiGame = `http://localhost:3000/steam-profile/${ID}/games`;
            }
            else{
                console.log(games.error);
            }

        }
        catch{error => console.log(`Error : ${error}`)}
    };

    return (
        <form onSubmit={handleSubmit} className="login-container">
            <h2 className="login-h2">Enter your ID:</h2>
            <input
                type="text"
                className="login-text"
                value={ID}
                onChange={(e) => setID(e.target.value)}
            />
            
            <button type="submit" className="login-button">Submit</button>

            <p ref = {errorRef}></p>
        </form>
    );
}

export default Login;