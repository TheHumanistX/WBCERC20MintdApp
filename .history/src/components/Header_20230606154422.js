import React from 'react';
import { LOGO } from '../assets';
import { ConnectWallet } from '@thirdweb-dev/react'


const Header = () => {
    return (
        <header>
            <span className='logo'>TURTLECAT COIN</span>
            <ConnectWallet className='connect-wallet' />
        </header>
    )
}

export default Header
