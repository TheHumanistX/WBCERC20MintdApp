import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/abi.json';

const EthersContext = createContext();

export const EthersProvider = ({ children }) => {

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
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
            setTokenContract(tokenContract);
            setNetwork(network);
            setChain(network ? network.name : null);

            const getTokenBalance = async (walletAddress, tokenContract) => {
                const decimals = await tokenContract.decimals();
                const balance = await tokenContract.balanceOf(walletAddress);
                const formattedBalance = ethers.utils.formatUnits(balance, decimals); // tokenDecimals is the number of decimal places your token uses.
                setTokenBalance(balance);
                setFormattedTokenBalance(formattedBalance);
            }

            getTokenBalance(walletAddress, tokenContract);
        }
    }, []);

    return (
        <EthersContext.Provider value={{
            chain,
            formattedTokenBalance,
            network,
            provider,
            signer,
            tokenBalance,
            tokenContract,
            walletAddress,
        }}>
            {children}
        </EthersContext.Provider>
    )
}


export const useTokenContractData = () => {
    const tokenContractData = useContext(EthersContext);
    return tokenContractData;
}