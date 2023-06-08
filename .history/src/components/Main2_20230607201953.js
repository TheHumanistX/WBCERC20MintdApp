import React from 'react'
import { ConnectWallet } from '@thirdweb-dev/react'
import ConnectionBalanceInfo from './ConnectionBalanceInfo';


const Main2 = () => {
    return (
        <div className='main2__container'>
            <div className='mint__wallet__container'>
                <span className='logo'>TURTLECAT COIN</span>
            </div>
            <div className='mintbox__button'>
        <button className='mintbox__button-mint'>MINT</button>
        <ConnectWallet className='connect-wallet' />
      </div>
            <ConnectionBalanceInfo />
            
        </div>
    )
}

export default Main2
