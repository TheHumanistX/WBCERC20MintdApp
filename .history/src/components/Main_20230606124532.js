import React from 'react'
import { WalletConnect } from '@thirdweb-dev/react'
const Main = () => {
    return (
        <div className='main__wrapper'>
            <div className='main__spacer'></div>
            <div className='main__container'>
                <div className="main__header">
                    <WalletConnect />
                </div>
            </div>
        </div>
    )
}

export default Main
