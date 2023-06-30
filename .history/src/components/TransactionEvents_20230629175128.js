import React from 'react'

// Importing required hooks from Thirdweb libraries.
import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    // Specifying the contract address to interact with.
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";

    // Using the `useContract` hook from thirdweb library to create a contract instance.
    const { contract } = useContract(contractAddress);

    // Using the `useContractEvents` hook to read all events from the contract.
    const { data: allEvents } = useContractEvents(contract, "Transfer", {
        queryFilter: {
          fromBlock: -300,
        },
      });

    // Logging the events to the console as a JSON string for debugging purposes.
    console.log(`All Events: ${JSON.stringify(allEvents)}`);

    // Mapping over all events, and creating a new array of the 'to' addresses.
    // If the 'to' address does not exist in an event, it adds `null` to the array.
    const mintedToAddresses = allEvents ? allEvents.map(event => event.data ? event.data.to : null) : [];

    // Logging the array of 'to' addresses to the console for debugging purposes.
    console.log(mintedToAddresses);

    // Taking the first five 'to' addresses from the array.
    const recentTransactions = mintedToAddresses.slice(0, 5);

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
                    <span>#{mintedToAddresses.length - index}</span>
                </div>
            ))}
        </div>
    )
}


export default TransactionEvents

// import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import contractABI from "../abi/abi.json";

// const TransactionEvents = () => {
//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
//   const { contract } = useContract(contractAddress);
//   const { data: wbcTransferEvents } = useContractEvents(contract, "Transfer");
//   const ABI = contractABI; // You'll need the ABI of your contract here
//   console.log('wbcTransferEvents: ', wbcTransferEvents);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const provider = new ethers.providers.Web3Provider(window.ethereum); // or whatever provider you're using
//       const contract = new ethers.Contract(contractAddress, ABI, provider);
//       const filter = contract.filters.Transfer(); // assumes your contract has a Transfer event

//       const logs = await provider.getLogs({
//         fromBlock: 9184538,
//         toBlock: "latest",
//         address: contract.address,
//         topics: filter.topics,
//       });
//       const parsedLogs = logs.map((log) => contract.interface.parseLog(log));
//       const transactions = parsedLogs.map((log) => log.args.to);
//       setRecentTransactions(transactions.slice(0, 5));
//     };

//     fetchEvents();
//   }, [ABI, contractAddress]);

//   return (
//     <div className="transaction__container border-gradient">
//       <div className="transaction__title">Recent Transactions</div>
//       {recentTransactions.map((to, index) => (
//         <div className="transaction__list" key={index}>
//           <p className="transaction__to">To: {to}</p>
//           <span>#{recentTransactions.length - index}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TransactionEvents;
