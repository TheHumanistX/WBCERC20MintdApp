import React from 'react'
import { useAddress, useChain, useConnectionStatus } from '@thirdweb-dev/react';

const ConnectionBalanceInfo = () => {

    const address = useAddress();
    const chain = useChain();
    const status = useConnectionStatus();

    // write arrow function to check if connected to a chain and if so, display the chain name
    const chainName = () => {
        if (chain) {


    return (
        <div class='info__container border-gradient'>
            <div className="wallet__address">
                WALLET: 0x59d2366B5961a5686Af406A83Cf90615B4229f78
            </div>
            <div className='chain__name'>
                CHAIN: GOERLI TEST NETWORK
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
