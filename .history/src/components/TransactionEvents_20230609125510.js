import React, { useEffect } from 'react'
import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
    const { contract } = useContract(contractAddress);
    const { data: allEvents } = useContractEvents(contract)
    console.log(`All Events: ${JSON.stringify(allEvents)}`)
    const toValues = allEvents.map(event => event.data ? event.data.to : null);

    console.log(toValues); 
    const recentTransactions = toValues.slice(0, 5);
    
    return (
    <div className='transaction__container border-gradient'>
        <div></div>
        {recentTransactions.map((to, index) => (
            <div className='transaction__list</div>' key={index}>
          <p className='transaction__to' key={index}>To: {to}</p>
          <span>#{recentTransactions.length - index}</span>
          </div>
        ))}
    </div>
  )
}

export default TransactionEvents
