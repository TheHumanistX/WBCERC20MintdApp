import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { useTokenContractData } from '../context/EthersContext'
// Import necessary thirdweb libraries
import { useContract, useContractRead, useTokenDecimals  } from '@thirdweb-dev/react';

const Footer = () => {
    const { decimals, tokenContract } = useTokenContractData();
    const [formattedSupply, setFormattedSupply] = useState(null);

    // Log the contract object
    console.log(`Token Contract: ${tokenContract}`)
    
    useEffect (() => {
        const getSupplyData = async () => {
            if (tokenContract) {
                const supply = await tokenContract.totalSupply();
                console.log(`Supply: ${supply}`)
                const formattedSupply = ethers.utils.formatUnits(supply, decimals);
                setFormattedSupply(supply)
            }
        }
        getSupplyData();
    }, [tokenContract])



    // Get totalSupply from the smart contract

    // const { data: supply } = useContractRead(contract, "totalSupply");

    // Get decimal places of the token
    // const { data: decimals } = useTokenDecimals(contract);

    // Log the decimal places of the token
    console.log(`Decimals: ${decimals}`)
    
    return (
        <footer>
            <div className='footer__container'>
                {/* Display circulating supply, converting from smallest unit (wei) to Ether */}
                <div className='footer__circulatingSupply'>
                    CIRCULATING SUPPLY: <span>{supply && parseInt(ethers.utils.formatUnits(supply, decimals))}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
