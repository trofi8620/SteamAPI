import React, { createContext, useState } from 'react';

export const SteamContext = createContext();

export const SteamProvider = ({ children }) => {
    const [steamProfile, setSteamProfile] = useState(null);

    return (
        <SteamContext.Provider value={{ steamProfile, setSteamProfile }}>
            {children}
        </SteamContext.Provider>
    );
};

export default SteamProvider;