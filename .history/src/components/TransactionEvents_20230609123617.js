import React, { useEffect } from 'react'
import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
    const { contract } = useContract(contractAddress);
    const { data: allEvents } = useContractEvents(contract)
    console.log(`All Events: ${JSON.stringify(allEvents)}`)
    // Write a function that takes the `allEvents` object and returns the data in the 'to' field, nothing else
    // Write a function that takes the `allEvents` object and returns the data in the 'to' field, nothing else
    // The function should return an array of all the 'to' fields in the `allEvents` object
    // For example:
    const handleTo = (allEvents) => {
      const to = allEvents.map((event) => event.to);
      return to;
    }
    
    console.log(handleTo(allEvents))
  
    useEffect(() => {
        handleTo(allEvents)
    }, [allEvents])
    return (
    <div className='transaction__container border-gradient'>
        
    </div>
  )
}

export default TransactionEvents
