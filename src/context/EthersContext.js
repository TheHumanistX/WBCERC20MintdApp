import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../abi/abi.json'

const EthersContext = createContext();

export const EthersProvider = ({ children }) => {

    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const [isProviderReady, setIsProviderReady] = useState(false);
    const [isTokenContractReady, setIsTokenContractReady] = useState(false);

    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [walletAddress, setWalletAddress] = useState(null)
    const [tokenContract, setTokenContract] = useState(null)
    const [chainName, setChainName] = useState(null)
    const [network, setNetwork] = useState(null)
    const [tokenBalance, setTokenBalance] = useState(null)
    const [formattedTokenBalance, setFormattedTokenBalance] = useState(null)
    const [decimals, setDecimals] = useState(null)
    const [canMint, setCanMint] = useState(false)
    const contractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602'
    const ETH_NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

    const updateProviderAndNetwork = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log('EthersContext - provider: ', provider)
        const network = await provider?.getNetwork();
        console.log('EthersContext - network: ', network)
        setProvider(provider)
        setNetwork(network)
        setChainName(network ? network.name : null)
    }

    const updateSignerAccountAndTokenContract = async (provider) => {
        const signer = provider.getSigner()
        const walletAddress = await signer.getAddress()
        const tokenContract = new ethers.Contract(contractAddress, abi, signer)
        console.log('EthersContext - walletAddress: ', walletAddress)
        console.log('EthersContext - tokenContract: ', tokenContract)
        setSigner(signer)
        setWalletAddress(walletAddress)
        setTokenContract(tokenContract)
    };

    const updateTokenData = async (tokenContract, walletAddress) => {
        const decimals = await tokenContract?.decimals()
        const tokenBalance = await tokenContract?.balanceOf(walletAddress)
        console.log('EthersContext - tokenBalance: ', tokenBalance)
        const canMint = await tokenContract?.checkIfUserCanMint(walletAddress)
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals)
        setDecimals(decimals)
        setTokenBalance(tokenBalance)
        setCanMint(canMint)
        setFormattedTokenBalance(formattedBalance)
    }

    const handleChainChange = async (networkIdHex) => {
        const networkId = parseInt(networkIdHex, 16)

        if ( networkId === 5 ) {
            setTriggerUpdate(prevState => !prevState);
            setIsProviderReady(false);
            setIsTokenContractReady(false);
            window.location.reload()
        } else {
            alert('Please switch to the Goerli network!')
        }

    };

    const handleAccountsChanged = async (accounts) => {
        console.log('EthersContext accountsChanged entered on account change...')
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
            alert('Your MetaMask is not connected anymore. Please unlock or reconnect.'); // display an alert
            // handle account disconnection...
            setWalletAddress(null);
            setSigner(null);
        } else if (accounts[0] !== walletAddress) {
            setTriggerUpdate(prevState => !prevState);
            setIsProviderReady(false);
            setIsTokenContractReady(false);
        }
    };

    useEffect(() => {
        window.ethereum.on('chainChanged', handleChainChange);
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      
        // Cleanup
        return () => {
          window.ethereum.removeListener('chainChanged', handleChainChange);
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
      }, []);

    useEffect(() => {
        if( window.ethereum ) {
            const setupProviderAndNetwork = async () => {
                try {
                    await updateProviderAndNetwork()
                    setIsProviderReady(true);
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupProviderAndNetwork()
        }
    }, [triggerUpdate])

    useEffect(() => {

        if (isProviderReady) { 
        const setupSignerAccountAndTokenContract = async () => {
            try {
                console.log('EthersContext - Entered second try block in ethersDataSetup, right before setting up wallet.')
                await updateSignerAccountAndTokenContract(provider)
                setIsTokenContractReady(true);
            } catch (err) {
                if (err.code === 4001) {
                    // User rejected request
                    console.log("User rejected request")
                } else {
                    console.error(err)
                }
            }
        }
        setupSignerAccountAndTokenContract()
    }
    }, [isProviderReady])

    useEffect(() => {
        if (isTokenContractReady) {
            const setupTokenData = async () => {
                try {
                    await updateTokenData(tokenContract, walletAddress)
                } catch (err) {
                    if (err.code === 4001) {
                        // User rejected request
                        console.log("User rejected request")
                    } else {
                        console.error(err)
                    }
                }
            }
            setupTokenData()
        }
    }, [isTokenContractReady])


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
    const tokenContractData = useContext(EthersContext)
    return tokenContractData
}