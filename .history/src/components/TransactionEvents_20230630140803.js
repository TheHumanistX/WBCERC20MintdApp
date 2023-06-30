import React from 'react'

// Importing required hooks from Thirdweb libraries.
import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    // Specifying the contract address to interact with.
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";

    // Using the `useContract` hook from thirdweb library to create a contract instance.
    const { contract } = useContract(contractAddress);

    // Using the `useContractEvents` hook to read all events from the contract.
    const { data: allTransferEvents } = useContractEvents(contract, "Transfer", {
        queryFilter: {
          fromBlock: 9170000,
        },
        subscribe: true
      });

    const mintEvents = allTransferEvents
    ? allTransferEvents
      .filter(event => event.data.from === '0x0000000000000000000000000000000000000000')
      .map(event => ({ to: event.data.to }))
    : [];

    console.log('mintEvents.length: ', mintEvents.length)
    const recentMints = mintEvents.length >= 5 ? mintEvents.slice(0, mintEvents.length - 5).reverse() : mintEvents.reverse();
 

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
                    <p className='transaction__to'>To: {mint.to}</p>
                    {/* Displaying the transaction number, starting from the most recent transaction. */}
                    <span>#{mintEvents.length - index}</span>
                </div>
            ))}
        </div>
    )
}


export default TransactionEvents