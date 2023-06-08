import React from 'react'
import { useAddress, useChain, useConnectionStatus } from '@thirdweb-dev/react';

const ConnectionBalanceInfo = () => {

    const address = useAddress();
    const chain = useChain();
    const status = useConnectionStatus();

    // write arrow function to check if connected to a chain and if so, display the chain name
    const handleChainConnection = () => {
        // If the status is unknown, show a loading message
        if (status === "unknown") return <span className='chain-connection'> Loading... </span>;
        // If the status is disconnected, show a not connected message
        if (status === "disconnected") return <span className='chain-connection'> Not Connected </span>;
        // If the status is connecting, show a connecting message
        if (status === "connecting") return <span className='chain-connection'> Connecting... </span>;

        // If the chain is supported, return the name of the chain
        if (chain) {
            return <span>{chain.name}</span>;
        }

        // If the chain is not supported, show an unsupported network message
        return <span className='chain-connection'> Connected to an unsupported network </span>;
    }


    return (
        <div class='info__container border-gradient'>
            <div className="wallet__address">
                WALLET: 0x59d2366B5961a5686Af406A83Cf90615B4229f78
            </div>
            <div className='chain__name'>
                CHAIN: {handleChainConnection()}
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
