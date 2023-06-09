import React from 'react'
// Importing required hooks from Thirdweb libraries.
import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    // Specifying the contract address to interact with.
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";

    // Using the `useContract` hook from thirdweb library to create a contract instance.
    const { contract } = useContract(contractAddress);

    // Using the `useContractEvents` hook to read all events from the contract.
    const { data: allEvents } = useContractEvents(contract)

    // Logging the events to the console as a JSON string for debugging purposes.
    console.log(`All Events: ${JSON.stringify(allEvents)}`)

    // Mapping over all events, and creating a new array of the 'to' addresses.
    // If the 'to' address does not exist in an event, it adds `null` to the array.
    const toValues = allEvents ? allEvents.map(event => event.data ? event.data.to : null) : [];

    // Logging the array of 'to' addresses to the console for debugging purposes.
    console.log(toValues);

    // Taking the first five 'to' addresses from the array.
    const recentTransactions = toValues.slice(0, 5);

    return (
    
        <div className='transaction__container border-gradient'>
            <div className='transaction__title'>
                Recent Transactions
            </div>
            {/* Iterating over recentTransactions array, and creating a JSX element for each transaction. */}
            {recentTransactions.map((to, index) => (
                // `key` prop is required by React for optimal performance when rendering lists.
                // The transaction index and 'to' address are displayed for each transaction.
                <div className='transaction__list' key={index}>
                    <p className='transaction__to'>To: {to}</p>
                    {/* Displaying the transaction number, starting from the most recent transaction. */}
                    <span>#{recentTransactions.length - index}</span>
                </div>
            ))}
        </div>
    )
}


export default TransactionEvents