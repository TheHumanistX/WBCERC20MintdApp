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
    const ETH_NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

    useEffect(() => {
        if (window.ethereum) {
            const setupProviderAndSigner = async () => {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);
                return { provider, signer };
            };

            const handleChainChange = (networkIdHex) => {
                const networkId = parseInt(networkIdHex, 16);
                ethersDataSetup(networkId);
            };

            const handleAccountsChanged = async (accounts) => {
                if (accounts.length > 0) {
                    const account = accounts[0];
                    setWalletAddress(account);
                    const { provider, signer } = await setupProviderAndSigner();
                    if (tokenContract) {
                        try {
                            const balance = await tokenContract.balanceOf(account);
                            const formattedBalance = ethers.utils.formatUnits(balance, decimals);
                            setTokenBalance(balance);
                            setFormattedTokenBalance(formattedBalance);
                            const canMint = await tokenContract.checkIfUserCanMint(account);
                            setCanMint(canMint);
                        } catch (error) {
                            console.log(`Cannot fetch account data: ${error.message}`);
                        }
                    }
                } else {
                    setWalletAddress(null);
                    setProvider(null);
                    setSigner(null);
                    setTokenBalance(null);
                    setFormattedTokenBalance(null);
                    setCanMint(false);
                }
            };

            const ethersDataSetup = async (networkId) => {
                if (window.ethereum) {
                    const { provider, signer } = await setupProviderAndSigner();
                    const network = await provider.getNetwork();
                    setNetwork(network);
                    setChainName(network ? network.name : null);
                    if (networkId === 5) { // Check for Goerli network
                        try {
                            const walletAddress = await signer.getAddress();
                            const tokenContract = new ethers.Contract(contractAddress, abi, signer);
                            setWalletAddress(walletAddress);
                            setTokenContract(tokenContract);
                            const decimals = await tokenContract.decimals();
                            const tokenBalance = await tokenContract.balanceOf(walletAddress);
                            const canMint = await tokenContract.checkIfUserCanMint(walletAddress);
                            const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
                            setDecimals(decimals);
                            setTokenBalance(tokenBalance);
                            setCanMint(canMint);
                            setFormattedTokenBalance(formattedBalance);
                        } catch (error) {
                            console.error(`Error in EthersProvider: ${error}`);
                        }
                    }
                }
            }
        };

        window.ethereum.on('chainChanged', handleChainChange);
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Initial setup
        ethersDataSetup(parseInt(window.ethereum.networkVersion, 10));

        // Clean up function
        return () => {
            window.ethereum.removeListener('chainChanged', handleChainChange);
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, [walletAddress]);




    return (
        <EthersContext.Provider value={{
            canMint,
            chainName,
            decimals,
            ETH_NULL_ADDRESS,
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


export const useEthers = () => {
    const tokenContractData = useContext(EthersContext);
    return tokenContractData;
}