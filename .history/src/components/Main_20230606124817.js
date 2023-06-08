import React from 'react'
import { ConnectWallet } from '@thirdweb-dev/react'

const Main = () => {
    return (
        <div className='main__wrapper'>
            <div className='main__spacer'></div>
            <div className='main__container'>
                <div className="main__header">
                    <></>
                    <ConnectWallet />
                </div>
            </div>
        </div>
    )
}

export default Main
