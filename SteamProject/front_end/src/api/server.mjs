import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const apiKey = process.env.STEAM_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/steam-profile/:id', async (req, res) => {
    const userID = req.params.id;
    const apiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${userID}`;
    

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const players = data.response.players;

        if (players && players.length > 0) {
            console.log(players[0]);
            res.json(players[0]);
        } else {
            console.log("User not found");
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data from Steam API' });
    }
app.get('/steam-profile/:id/games', async (req,res) => {
    const userID = req.params.id;
    const apiGames = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${userID}&include_appinfo=1&include_played_free_games=1&format=json`;
    try {
        const response = await fetch(apiGames);
        const data = await response.json();
        const games = data.response.games;

        if (games && games.length > 0) {
            console.log(games);
            res.json(games);
        } else {
            console.log("Games not found");
            res.status(404).json({ error: "Games not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data from Steam API' });
    }
})
   

});

app.listen(3000, () => {
    console.log('CORS-enabled web server listening on port 3000');
});