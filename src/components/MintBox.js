import React from 'react'
import { coin, coin2 } from '../assets'

const MintBox = () => {
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
