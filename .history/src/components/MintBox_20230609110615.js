import React from 'react'
import { coin, coin2 } from '../assets'
import { useAddress, useContract, useContractRead  } from '@thirdweb-dev/react';


const MintBox = () => {
  const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";

  return (
    <div className='mintbox__container border-gradient'>
      <img className='mintbox__turtlecat' src={coin2} alt='TurtleCat!' />
      <div className='mintbox__button'>
        <button className='mintbox__button-mint'>MINT</button>
      </div>
    </div>
  )
}

export default MintBox
