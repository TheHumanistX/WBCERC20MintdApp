import React, { createContext } from 'react';
import ABI from '../ABI/ABI.json';

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {

    const contractAddress = 0xFd741C04B0e40BAf0233fd1b1Ec0969A2ffF5fD8;

    return (
        <ContractContext.Provider value={{
            contractAddress,
        }}>
            {children}
        </ContractContext.Provider>
    )
}