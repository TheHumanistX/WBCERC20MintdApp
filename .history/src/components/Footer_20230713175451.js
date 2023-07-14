import React, { useEffect } from 'react'
import { useTokenContractData } from '../context/EthersContext'
// Import necessary thirdweb libraries
import { useContract, useContractRead, useTokenDecimals  } from '@thirdweb-dev/react';

const Footer = () => {
    const { tokenContract } = useTokenContractData();

    // Log the contract object
    console.log(`Token Contract: ${tokenContract}`)
    
    useEffect (() => {
        if (tokenContract) {
            await
        }
    }, [tokenContract])



    // Get totalSupply from the smart contract

    const { data: supply } = useContractRead(contract, "totalSupply");

    // Get decimal places of the token
    const { data: decimals } = useTokenDecimals(contract);

    // Log the decimal places of the token
    console.log(`Decimals: ${decimals}`)
    
    return (
        <footer>
            <div className='footer__container'>
                {/* Display circulating supply, converting from smallest unit (wei) to Ether */}
                <div className='footer__circulatingSupply'>
                    CIRCULATING SUPPLY: <span>{supply && (supply / 1e18).toLocaleString()}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
