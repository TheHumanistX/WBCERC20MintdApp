import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/abi.json';

const EthersContext = createContext();

export const EthersProvider = ({ children, setIsLoading  }) => {

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
        const setupProviderAndSigner = async () => {

        };

        const handleChainChange = (networkIdHex) => {
            const networkId = parseInt(networkIdHex, 16);
            ethersDataSetup(networkId);
        };

        const handleAccountsChanged = async (accounts) => {
            if (accounts.length > 0) {
                const account = accounts[0];
                setWalletAddress(account);
                try {
                    const { provider, signer } = await setupProviderAndSigner();
                } catch (err) {
                    console.error(`Error in EthersProvider: ${err}`);
                }
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

        const ethersDataSetup = async () => {
            try {
                if (window.ethereum) {
                    console.log('EthersContext - Entered try block in ethersDataSetup')
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    setProvider(provider);
                    console.log('EthersContext - provider: ', provider)
                    const network = await provider.getNetwork();
                    console.log('EthersContext - network: ', network)
                    setNetwork(network);
                    setChainName(network ? network.name : null);
                    
                    if (network?.chainId === 5) { // Check for Goerli network
                        try {
                            const signer = provider.getSigner();
                            setSigner(signer);
                            console.log('EthersContext - Entered second try block in ethersDataSetup, right before setting up wallet.')
                            const tokenContract = new ethers.Contract(contractAddress, abi, signer);
                            const walletAddress = await signer?.getAddress();
                            console.log('EthersContext - walletAddress: ', walletAddress)
                            console.log('EthersContext - tokenContract: ', tokenContract)
                            setWalletAddress(walletAddress);
                            setTokenContract(tokenContract);
                            const decimals = await tokenContract?.decimals();
                            const tokenBalance = await tokenContract?.balanceOf(walletAddress);
                            const canMint = await tokenContract?.checkIfUserCanMint(walletAddress);
                            const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
                            setDecimals(decimals);
                            setTokenBalance(tokenBalance);
                            setCanMint(canMint);
                            setFormattedTokenBalance(formattedBalance);
                            setIsLoading(false)
                        } catch (err) {
                            if (err.code === 4001) {
                                // User rejected request
                                console.log("User rejected request");
                            } else {
                                console.error(err);
                            }
                            setIsLoading(false)
                        }
                    }
                }
            } catch (err) {
                if (err.message.includes('unknown account #0')) {
                    // Handle error due to MetaMask being locked
                    console.log('Metamask is locked. Please unlock and reconnect.');
                    setWalletAddress(null);
                    setSigner(null);
                    setProvider(null);
                } else {
                    console.error('Error in EthersContext: ', err.message)
                }
                setIsLoading(false)
            }
        };

        window.ethereum.on('chainChanged', handleChainChange);
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Initial setup
        ethersDataSetup().then(() => {
            setIsLoading(false);  // Set isLoading to false when everything is initialized
          });

        // Clean up function
        return () => {
            window.ethereum.removeListener('chainChanged', handleChainChange);
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);




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