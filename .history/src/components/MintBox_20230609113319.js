import React from 'react'
import { coin, coin2 } from '../assets'
import { useAddress, useContract, useContractRead, useContractWrite  } from '@thirdweb-dev/react';


const MintBox = () => {
  const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: canMint } = useContractRead(contract, "checkIfUserCanMint", [address]);
  const { mutateAsync: mint, isLoading } = useContractWrite(contract, "mint")

  const callToMint = async () => {
    try {
      const data = await mint([address]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }


  const mintHandler = () => {
    if (canMint) {
      console.log('Minting...')
      return(
        <button className='mintbox__button-mint' onClick={ callToMint }>MINT</button>
      )
    } 

    return(
      <button className='mintbox__button-mint cannotMint' disabled>MINT</button>
    )
  
    
  }

  return (
    <div className='mintbox__container border-gradient'>
      <img className='mintbox__turtlecat' src={coin2} alt='TurtleCat!' />
      <div className='mintbox__button'>
        {mintHandler()}
      </div>
    </div>
  )
}

export default MintBox
