import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi.json';

const EthersContext = createContext();

export const EthersProvider = ({ children }) => {

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [contract, setContract] = useState(null);
    const [chain, setChain] = useState(null);
    const [network, setNetwork] = useState(null);
    const contractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.getNetwork().then(network => setNetwork(network));
            const signer = provider.getSigner();
            const walletAddress = signer.getAddress();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            setProvider(provider);
            setSigner(signer);
            setWalletAddress(walletAddress);
            setContract(contract);
        }
    }, []);


    return (
        <EthersContext.Provider value={{
            walletAddress,
            chain,
            contract,
            network,
            provider,
            signer,
        }}>
            {children}
        </EthersContext.Provider>
    )
}

