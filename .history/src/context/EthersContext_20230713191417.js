import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/abi.json';

const EthersContext = createContext();

export const EthersProvider = ({ children }) => {

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
    const [chainName, setChainName] = useState(null);
    const [network, setNetwork] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(null);
    const [formattedTokenBalance, setFormattedTokenBalance] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [canMint, setCanMint] = useState(false);
    const contractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';

    useEffect(() => {
        const ethersDataSetup = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const network = await provider.getNetwork();
                setNetwork(network);
                
                const signer = provider.getSigner();
                const walletAddress = await signer.getAddress();
                const tokenContract = new ethers.Contract(contractAddress, abi, signer);
    
                setProvider(provider);
                setSigner(signer);
                setWalletAddress(walletAddress);
                setTokenContract(tokenContract);
                setChainName(network ? network.name : null);
    
                const decimals = await tokenContract.decimals();
                const tokenBalance = await tokenContract.balanceOf(walletAddress);
                const canMint = await tokenContract.checkIfUserCanMint(walletAddress);
                const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
                setDecimals(decimals);
                setTokenBalance(tokenBalance);
                setCanMint(canMint);
                setFormattedTokenBalance(formattedBalance);
            }
        };
        ethersDataSetup();
    }, []);

    return (
        <EthersContext.Provider value={{
            canMint,
            chainName,
            decimals,
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