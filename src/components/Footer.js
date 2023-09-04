import React from 'react'
import { ethers } from 'ethers';
import { useEthers } from '../context/EthersContext'
import { useContract } from '../hooks/useContract';

const Footer = () => {
    const { decimals, tokenContract } = useEthers();


    console.log(`Token Contract: ${tokenContract}`)

    // Getting total supply from the contract
    const getSupplyData = async (contract) => {
        if (contract) {
            try {
                const supply = await contract.totalSupply();
                console.log(`Supply: ${supply}`)
                const formattedSupply = parseInt(ethers.utils.formatUnits(supply, decimals));
                console.log('getSupplyData formattedSupply: ', formattedSupply)
                return (formattedSupply);
            } catch (err) {
                console.error('Error getting supply data: ', err)
            }
        }
    }
    
    const formattedSupply = useContract(tokenContract, getSupplyData);

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
