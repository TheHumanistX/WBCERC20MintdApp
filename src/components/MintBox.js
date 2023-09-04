import React from 'react'
import { ethers } from 'ethers';
import { useEthers } from '../context/EthersContext'
import { coin } from '../assets'



const MintBox = () => {
    const { canMint, contract } = useEthers();

    // Define mint function to call mint function in the contract
    const callToMint = async (args) => {
        try {
            const transaction = await contract.mint(args);
            console.info("contract call successs", transaction);
            const receipt = await transaction.wait();
            console.log("receipt", receipt);
        } catch (err) {
            if (err.code === 4001) {
                // User rejected request
                console.log("User rejected request")
            } else {
                console.error('Failed to mint...', err)
            }
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