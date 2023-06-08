import React, { createContext } from 'react';
import ABI from '../ABI/ABI.json';

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {

    const contract = 

    return (
        <ContractContext.Provider value={{
            
        }}>
            {children}
        </ContractContext.Provider>
    )
}