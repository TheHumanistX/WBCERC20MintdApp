import React, { createContext } from 'react';
import ABI from '../ABI/ABI.json';

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {

    const contractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';

    return (
        <ContractContext.Provider value={{
            contractAddress,
        }}>
            {children}
        </ContractContext.Provider>
    )
}