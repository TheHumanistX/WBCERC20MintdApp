import React from 'react'
import { coin } from '../assets'

const MintBox = () => {
  return (
    <div className='mintbox__container border-gradient'>
      <img className='mintbox__turtlecat' src={coin} alt='TurtleCat!' />
      <div className='mintbox__button'>
        <button className='mintbox__button-mint'>MINT</button>
      </div>
    </div>
  )
}

export default MintBox
