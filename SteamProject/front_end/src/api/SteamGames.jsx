import React, { createContext, useState } from 'react';

export const SteamGames = createContext();
export const GameProvider = ({ children }) => {
    const [steamGames, setSteamGames] = useState(null);
    return (
        <SteamGames.Provider value = {{ steamGames,setSteamGames}}>
            {children}
        </SteamGames.Provider>
    )
};

export default GameProvider;