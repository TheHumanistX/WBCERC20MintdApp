import React from 'react'
import { useAddress, useChain, useContract, useContractRead  } from '@thirdweb-dev/react';

const ConnectionBalanceInfo = () => {

    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
    

    
    const address = useAddress();
    const chain = useChain();
    const { contract } = useContract(contractAddress);
    const { data: balanceOf } = useContractRead(contract, "balanceOf", [address]);
    const { data: canMint } = useContractRead(contract, "checkIfUserCanMint", [address]);
 
    
    const handleConnectWallet = () => {
        // If there is no connected wallet, return a message indicating so
        if (!address) return <span className='italic'>No Wallet Connected!</span>

        // Else return the address of the connected wallet
        return  <span className='bold'>Wallet: {address}</span>;
    }
    
    


    return (
        <div className='info__container border-gradient'>
            <div className="wallet__address">
                {handleConnectWallet()}
            </div>
            <div className='chain__name'>
                CHAIN: <span>{chain && chain.name} </span>
            </div>
            <div className='WBC__balance'>
                WBC BALANCE: <span>{balanceOf && (balanceOf / 1e18).toString()}</span>
            </div>
            <div className='able__to__mint'>
                ABLE TO MINT: <span>{ canMint ? 'YES' : 'NO' }</span>
            </div>
        </div>
    )
}

export default ConnectionBalanceInfo
