import React, { useEffect } from 'react'
import { useContract, useContractEvents } from '@thirdweb-dev/react';

const TransactionEvents = () => {
    
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
    const { contract } = useContract(contractAddress);
    const { data: allEvents } = useContractEvents(contract)
    console.log(`All Events: ${JSON.stringify(allEvents)}`)
    const toValues = allEvents.map(event => event.data ? event.data.to : null);

    console.log(toValues); // Outputs: ["0x59d2366B5961a5686Af406A83Cf90615B4229f78", "0xc8485214f34504cC922bFb8d4CE4995e206bb26c"]
    
    return (
    <div className='transaction__container border-gradient'>
        
    </div>
  )
}

export default TransactionEvents
