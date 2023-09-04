import React from 'react'
import { ethers } from 'ethers';
import { useEthers } from '../context/EthersContext';
import { handleConnectWallet } from '../utility/handleConnectWallet';

const ConnectionBalanceInfo = () => {
    const { canMint, chainName, formattedTokenBalance, walletAddress } = useEthers();

    return (
        <div className='info__container border-gradient'>
            <div className="wallet__address">
                {/* Call our helper function and render its result */}
                {handleConnectWallet(walletAddress)}
            </div>
            <div className='chain__name'>
                {/* Display the name of the connected chain */}
                CHAIN: <span>{chainName && chainName} </span>
            </div>
            <div className='WBC__balance'>
                {/* Display the balance from the contract, converting from raw Wei to Ether and formatting it with commas */}
                WBC BALANCE: <span>{formattedTokenBalance && formattedTokenBalance}</span>
            </div>
            <div className='able__to__mint'>
                {/* Check if the user can mint and display the corresponding text */}
                ABLE TO MINT: <span>{ canMint ? 'YES' : 'NO' }</span>
            </div>
        </div>
    )
}


export default ConnectionBalanceInfo
