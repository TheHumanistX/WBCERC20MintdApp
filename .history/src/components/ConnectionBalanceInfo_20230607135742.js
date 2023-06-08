import React from 'react'

const ConnectionBalanceInfo = () => {
    return (
        <div className='info__container border-gradient'>
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
