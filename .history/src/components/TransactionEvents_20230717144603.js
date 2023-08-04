import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { useTokenContractData } from '../context/EthersContext'
// Importing required hooks from Thirdweb libraries.
// import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    const { ETH_NULL_ADDRESS, formattedBalanceOf, provider, tokenContract } = useTokenContractData();
    const [mintEvents, setMintEvents] = useState([]);
    // // Specifying the contract address to interact with.
    // const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";

    // // Using the `useContract` hook from thirdweb library to create a contract instance.
    // const { contract } = useContract(contractAddress);

    // Using the `useContractEvents` hook to read all events from the contract.
    // const { data: allTransferEvents } = useContractEvents(tokenContract, "Transfer", {
    //     queryFilter: {
    //       fromBlock: 9170000,
    //     },
    //     subscribe: true
    //   });

    useEffect(() => {
        console.log('Entered useEffect in TransactionEvents.js')
        if(tokenContract) {
        const fetchEvents = async () => {
            console.log('Entered fetchEvents in TransactionEvents.js')
            const filter = tokenContract && tokenContract.filters.Transfer(); // assumes your contract has a Transfer event
            console.log('filter: ', filter)
            await provider.send("eth_requestAccounts", [])

            const logs = await provider.getLogs({
                fromBlock: 9170000,
                toBlock: "latest",
                address: tokenContract.address,
                topics: filter.topics,
            });
            console.log('logs: ', logs)
            const parsedLogs = logs.map((log) => tokenContract.interface.parseLog(log));
            console.log('parsedLogs: ', parsedLogs)
            const mintEvents = parsedLogs
            ? parsedLogs
                .filter(event => event.args.from === ETH_NULL_ADDRESS)
                .map(event => ( event.args.to ))
            : [];
            setMintEvents(mintEvents);
            console.log('mintEvents: ', mintEvents)
        };

        fetchEvents();
    }
    }, [formattedBalanceOf, tokenContract])



    console.log('mintEvents.length: ', mintEvents.length)
    // const recentMints = mintEvents.length >= 5 ? mintEvents.slice(0, mintEvents.length - 5) : mintEvents.reverse();
    const recentMints = mintEvents.length > 5 
    ? [...mintEvents.slice(0, mintEvents.length - 5)].reverse()  
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