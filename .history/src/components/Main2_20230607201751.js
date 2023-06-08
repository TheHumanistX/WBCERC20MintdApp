import React from 'react'
import ConnectionBalanceInfo from './ConnectionBalanceInfo';


const Main2 = () => {
    return (
        <div className='main2__container'>
            <div>
                <span className='logo'>TURTLECAT COIN</span>
            </div>
            <div className='mintbox__button'>
        <button className='mintbox__button-mint'>MINT</button>
      </div>
            <ConnectionBalanceInfo />
            
        </div>
    )
}

export default Main2
