import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { useEthers } from '../context/EthersContext'
import { useContract } from '../hooks/useContract';
// Import necessary thirdweb libraries
// import { useContract, useContractRead, useTokenDecimals  } from '@thirdweb-dev/react';

const Footer = () => {
    const { decimals, tokenContract } = useEthers();


    console.log(`Token Contract: ${tokenContract}`)


    const getSupplyData = async (contract) => {
        if (contract) {
            const supply = await contract.totalSupply();
            console.log(`Supply: ${supply}`)
            const formattedSupply = parseInt(ethers.utils.formatUnits(supply, decimals));
            console.log('getSupplyData formattedSupply: ', formattedSupply)
            return (formattedSupply);
        }
    }
    c
    const formattedSupply = useContract(tokenContract, getSupplyData);
    console.log('formattedSupply: ', formattedSupply)
    // Get totalSupply from the smart contract

    // const { data: supply } = useContractRead(contract, "totalSupply");

    // Get decimal places of the token
    // const { data: decimals } = useTokenDecimals(contract);

    return (
        <footer>
            <div className='footer__container'>
                {/* Display circulating supply, converting from smallest unit (wei) to Ether */}
                <div className='footer__circulatingSupply'>
                    CIRCULATING SUPPLY: <span>{formattedSupply && formattedSupply}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
