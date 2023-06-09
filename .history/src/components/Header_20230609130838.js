import React from 'react';
// Import necessary thirdweb libraries
import { ConnectWallet } from '@thirdweb-dev/react'

const Header = () => {
    // Return the header JSX component
    return (
        <header>
            <div>
                {/* Display company logo */}
                <span className='logo'>TURTLECAT COIN</span>
            </div>
            <div className='connect-wallet-container'> 
                {/* Display the ConnectWallet button from thirdweb library */}
                <ConnectWallet className='connect-wallet' />
            </div>
        </header>
    )
}

export default Header

