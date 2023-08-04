import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { useEthers } from '../context/EthersContext'
import { useContract } from '../hooks/useContract';
// Importing required hooks from Thirdweb libraries.
// import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    const { ETH_NULL_ADDRESS, formattedBalanceOf, provider, tokenContract } = useEthers();
    


    console.log('TransactionEvents tokenContract: ', tokenContract)
    const fetchEvents = async (contract) => {
        if (contract) {
            console.log('Entered fetchEvents in TransactionEvents.js')
            try{
                // Filter to only mint events (where the from address is the null address)
                const filter = contract.filters.Transfer(ETH_NULL_ADDRESS, null, null);
    
                // Get the event logs
                const logs = await contract.queryFilter(filter, 8170000, 'latest');
                console.log('logs: ', logs)
    
                // Extract the mint event data
                const mintEvents = logs.map(log => log.args.to);
                return (mintEvents)
            } catch (err) {
                console.error('Error getting mint events: ', err)
            }
        }
    };

    const mintEvents = useContract(tokenContract, fetchEvents);
    // console.log('mintEvents.length: ', mintEvents.length)
    // const recentMints = mintEvents.length >= 5 ? mintEvents.slice(0, mintEvents.length - 5) : mintEvents.reverse();
    const recentMints = mintEvents.length >= 5
        ? [...mintEvents.slice(mintEvents.length - 5, mintEvents.length)].reverse()
        : [...mintEvents].reverse();
    console.log('recentMints: ', recentMints)

    return (

        <div className='transaction__container border-gradient'>
            <div className='transaction__title'>
                Recent Transactions
            </div>
            {/* Iterating over recentTransactions array, and creating a JSX element for each transaction. */}
            {recentMints.map((mint, index) => (
                // `key` prop is required by React for optimal performance when rendering lists.
                // The transaction index and 'to' address are displayed for each transaction.
                <div className='transaction__list' key={index}>
                    <p className='transaction__to'>To: {mint}</p>
                    {/* Displaying the transaction number, starting from the most recent transaction. */}
                    <span>#{mintEvents.length - index}</span>
                </div>
            ))}
        </div>
    )
}


export default TransactionEvents