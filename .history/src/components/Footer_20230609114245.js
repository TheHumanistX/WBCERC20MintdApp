import React from 'react'
import { useContract, useContractRead } from '@thirdweb-dev/react';

const Footer = () => {
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
    const { contract } = useContract(contractAddress);
    console.log(`Contract: ${contract}`)
    const { data: supply } = useContractRead(contract, "totalSupply");
    return (
        <footer>
            <div className='footer__container'>
                <div className='footer__totalSupply'>
                    CIRCULATING SUPPLY: <span>{supply && supply.toString()}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
