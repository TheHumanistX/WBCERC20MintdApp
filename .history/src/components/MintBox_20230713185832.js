import React from 'react'
import { ethers } from 'ethers';
import { useContractData } from '../context/EthersContext'
// Import necessary modules from thirdweb and local assets
import { coin } from '../assets'
import { useAddress, useContract, useContractRead, useContractWrite  } from '@thirdweb-dev/react';


const MintBox = () => {
    const { canMint, contract, walletAddress } = useContractData();
    // Define contract address
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
    
    // // Get address of connected wallet
    // const address = useAddress();
    
    // // Get contract using thirdweb hook
    // const { contract } = useContract(contractAddress);
    
    // // Get boolean flag indicating if user can mint from the contract
    // const { data: canMint } = useContractRead(contract, "checkIfUserCanMint", [address]);
    
    // // Get mint function from the contract
    // const { mutateAsync: mint, isLoading } = useContractWrite(contract, "mint")

    // Define mint function to call mint function in the contract
    const mint = async (args) => {
        try {
            const transaction = await contract.mint(args);
            console.info("contract call successs", data);
            receipt = await transaction.wait();
            console.log("receipt", receipt);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    // Define function to call mint function in the contract
    const callToMint = async () => {
        try {
            const data = await mint([address]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    // Define mint handler function which returns button element depending on canMint status
    const mintHandler = () => {
      // Check if user can mint
      if (canMint) {
          // Log minting action
          console.log('Minting...')
          // Return button element to mint token
          return(
              <button className='mintbox__button-mint' onClick={ callToMint }>MINT</button>
          )
      } 

      // If user cannot mint, return disabled button
      return(
          <button className='mintbox__button-mint cannotMint' disabled>MINT</button>
      )
  }

  
  return (
      <div className='mintbox__container border-gradient'>
          {/* Display coin image */}
          <img className='mintbox__turtlecat' src={coin} alt='TurtleCat!' />
          <div className='mintbox__button'>
              {/* Display mint button */}
              {mintHandler()}
          </div>
      </div>
  )
}

// Export MintBox component for use in other components
export default MintBox