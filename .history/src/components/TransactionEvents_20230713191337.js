import React, { useState } from 'react'
import { ethers } from 'ethers';
import { useTokenContractData } from '../context/EthersContext'
// Importing required hooks from Thirdweb libraries.
import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    const { contractAddress, provider, signer, tokenContract, walletAddress } = useTokenContractData();
    const [recentTransactions, setRecentTransactions] = useState([]);
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

    const fetchEvents = async () => {
        const filter = tokenContract.filters.Transfer(); // assumes your contract has a Transfer event
        await provider.send("eth_requestAccounts", [])
  
        const logs = await provider.getLogs({
          fromBlock: 17552335,
          toBlock: "latest",
          address: tokenContract.address,
          topics: filter.topics,
        });
        const parsedLogs = logs.map((log) => tokenContract.interface.parseLog(log));
        const transactions = parsedLogs ? parsedLogs.map((log) => log.args.to) : '';
        setRecentTransactions(transactions.slice(0, 5));
      };

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