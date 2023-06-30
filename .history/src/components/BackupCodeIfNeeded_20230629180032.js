// This was how I pulled transactions when ThirdWeb useContractEvents was acting up.
// 
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
