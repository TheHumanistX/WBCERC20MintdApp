import React from 'react'
import { useAddress, useChain } from '@thirdweb-dev/react';

const ConnectionBalanceInfo = () => {

    const address = useAddress();
    const chain = useChain();

    return (
        <div class='info__container border-gradient'>
            <div className="wallet__address">
                WALLET: {address}
            </div>
            <div className='chain__name'>
                CHAIN: {chain}
            </div>
            <div className='WBC__balance'>
                WBC BALANCE: 1,000
            </div>
            <div className='able__to__mint'>
                ABLE TO MINT: NO
            </div>
        </div>
    )
}

export default ConnectionBalanceInfo
