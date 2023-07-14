import React from 'react'
import { ethers } from 'ethers';
import { useTokenContractData } from '../context/EthersContext';
// Import various hooks from @thirdweb-dev/react for interacting with the Ethereum blockchain
// import { useAddress, useChain, useContract, useContractRead } from '@thirdweb-dev/react';


const ConnectionBalanceInfo = () => {
    const { canMint, chain, contract, formattedTokenBalance, walletAddress } = useTokenContractData();
    // // Define the address of the contract we want to interact with
    // const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";

    // // Use the useAddress hook to get the address of the connected wallet
    // const address = useAddress();

    // // Use the useChain hook to get details of the currently connected blockchain
    // const chain = useChain();

    // // Use the useContract hook to create an instance of the contract we want to interact with
    // const { contract } = useContract(contractAddress);

    // // Use the useContractRead hook to read the 'balanceOf' property of the contract for the connected address
    // const { data: balanceOf } = useContractRead(contract, "balanceOf", [address]);

    // // Use the useContractRead hook to read the 'checkIfUserCanMint' property of the contract for the connected address
    // const { data: canMint } = useContractRead(contract, "checkIfUserCanMint", [address]);
 
    // Define a helper function that checks if a wallet is connected and returns the corresponding JSX
    const handleConnectWallet = () => {
        // If there is no connected wallet, return a message indicating so
        if (!walletAddress) return <span className='italic'>No Wallet Connected!</span>

        // Else return the address of the connected wallet
        return  <span className='bold'>Wallet: {walletAddress}</span>;
    }
    
    
    return (
        <div className='info__container border-gradient'>
            <div className="wallet__address">
                {/* Call our helper function and render its result */}
                {handleConnectWallet()}
            </div>
            <div className='chain__name'>
                {/* Display the name of the connected chain */}
                CHAIN: <span>{chain && chain} </span>
            </div>
            <div className='WBC__balance'>
                {/* Display the balance from the contract, converting from raw Wei to Ether and formatting it with commas */}
                WBC BALANCE: <span>{formattedTokenBalance && formattedTokenBalance}</span>
            </div>
            <div className='able__to__mint'>
                {/* Check if the user can mint and display the corresponding text */}
                ABLE TO MINT: <span>{ canMint ? 'YES' : 'NO' }</span>
            </div>
        </div>
    )
}


export default ConnectionBalanceInfo
