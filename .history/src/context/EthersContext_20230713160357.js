import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi.json';

const EthersContext = createContext();

export const EthersProvider = ({ children }) => {

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [contract, setContract] = useState(null);
    const contractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';

    useEffect(() => {
        if(window.ethereum) {           
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const walletAddress = signer.getAddress();
            const contract = new ethers.Contract(contractAddress, abi, signer);
        }
    }


    return (
        <EthersContext.Provider value={{ provider, signer, address }}>
            {children}
        </EthersContext.Provider>
    )
}

