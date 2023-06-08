import React from 'react';
import { ConnectWallet } from '@thirdweb-dev/react'


const Header = () => {
    return (
        <header>
            <div>
            <span className='logo'>TURTLECAT COIN</span>
            </div>
            <div>
            <ConnectWallet className='connect-wallet' />
            </div>
        </header>
    )
}

export default Header
