import React from 'react';
import { LOGO } from '../assets';
import { ConnectWallet } from '@thirdweb-dev/react'


const Header = () => {
  return (
    <div>
        <img src={LOGO} alt='TurtleCat Coin LOGO' />
      <ConnectWallet className='connect-wallet' />
    </div>
  )
}

export default Header
