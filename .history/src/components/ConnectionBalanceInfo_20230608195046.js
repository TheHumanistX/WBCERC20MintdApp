import React, { useContext } from 'react'
import { useAddress, useChain, useConnectionStatus, useContract, useContractRead  } from '@thirdweb-dev/react';
import { ContractContext } from '../context/ContractContext';
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const ConnectionBalanceInfo = () => {

    const { contractAddress } = useContext(ContractContext);
    const { contract } = useContract(contractAddress);

    const sdk = new ThirdwebSDK("goerli");

    console.log(contract);
    const address = useAddress();
    const chain = useChain();
    const status = useConnectionStatus();
    const { data, isLoading2 } = useContractRead(contract, "totalSupply");
    console.log(`totalSupply: ${data}`)
    
    
    const { data: balance, isLoading } = useContractRead(contract, "balanceOf", [address])
    console.log(`Balance: ${balance}`)
    // const { canMint } = useContractRead(contract, 'checkIfUserCanMint', ['0x59d2366B5961a5686Af406A83Cf90615B4229f78']);
    // console.log(`Can Mint: ${canMint}`)
    
    const handleConnectWallet = () => {
        // If there is no connected wallet, return a message indicating so
        if (!address) return <span className='italic'>No Wallet Connected!</span>

        // Else return the address of the connected wallet
        return  <span className='bold'>Wallet: {address}</span>;
    }
    
    const handleChainConnection = () => {
        // If the status is unknown, show a loading message
        if (status === "unknown") return <span className='italic'> Loading... </span>;
        // If the status is disconnected, show a not connected message
        if (status === "disconnected") return <span className='italic'> Not Connected </span>;
        // If the status is connecting, show a connecting message
        if (status === "connecting") return <span className='italic'> Connecting... </span>;

        // If the chain is supported, return the name of the chain
        if (chain) {
            return <span>{chain.name}</span>;
        }

        // If the chain is not supported, show an unsupported network message
        return <span className='italic'> Connected to an unsupported network </span>;
    }


    return (
        <div className='info__container border-gradient'>
            <div className="wallet__address">
                {handleConnectWallet()}
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
