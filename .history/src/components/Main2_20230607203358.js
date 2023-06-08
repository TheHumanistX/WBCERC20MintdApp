import React from 'react'
import { ConnectWallet } from '@thirdweb-dev/react'
import ConnectionBalanceInfo from './ConnectionBalanceInfo';


const Main2 = () => {
    return (
        <div className='main2__container'>

            <span className='logo'>TURTLECAT COIN</span>

            <div className='mint__wallet__container'>
                <div className='mintbox__button'>
                    <button className='mintbox__button-mint'>MINT</button>
                </div>
                <ConnectWallet className='connect-wallet' />
            </div>
            <ConnectionBalanceInfo />
            <div className='graphic'>
                <span>\\\\\\\\</span>
                <span>&#47;&#47;&#47;&#47;&#47;&#47;&#47;</span>
            </div>
        </div>
    )
}

export default Main2
