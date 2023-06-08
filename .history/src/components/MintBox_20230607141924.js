import React from 'react'
import { turtlecat } from '../assets'

const MintBox = () => {
  return (
    <div className='mintbox__container border-gradient'>
      <img className='mintbox__turtlecat' src={turtlecat} alt='TurtleCat!' />
      <div className='mintbox__button'><span>MINT</span></div>
    </div>
  )
}

export default MintBox
