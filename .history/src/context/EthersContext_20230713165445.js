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
    const [tokenBalance, setTokenBalance] = useState(null);
    const [formattedTokenBalance, setFormattedTokenBalance] = useState(null);
    const contractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.getNetwork().then(network => setNetwork(network));
            const signer = provider.getSigner();
            const walletAddress = signer.getAddress();
            const tokenContract = new ethers.Contract(contractAddress, abi, signer);

            setProvider(provider);
            setSigner(signer);
            setWalletAddress(walletAddress);
            setContract(tokenContract);
            setNetwork(network);
            setChain(network.name);
        }
    }, []);

    const getTokenBalance = async (signer, userAddress, tokenContract) => {
        const decimals = await tokenContract.decimals();
        const balance = await tokenContract.balanceOf(walletAddress);
        const formattedBalance = ethers.utils.formatUnits(balance, decimals); // tokenDecimals is the number of decimal places your token uses.
        setTokenBalance(balance);
        setFormattedTokenBalance(formattedBalance);
    }

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

