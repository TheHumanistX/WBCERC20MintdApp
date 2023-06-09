import React from 'react'
import { useContract, useContractRead } from '@thirdweb-dev/react';

const Footer = () => {
    const contractAddress = '0xFB29697113015019c42E90fdBC94d9B4898D2602';
    const { contract } = useContract(contractAddress);
    const { data: supply } = useContractRead(contract, "totalSupply");
    return (
        <footer>
            <div className='footer__container'>
                <div className='footer__totalSupply'>
                    TOTAL SUPPLY: 1,000,000
                </div>
                <div className='footer__circulatingSupply'>
                    CIRCULATING SUPPLY: 1,000,000
                </div>
            </div>
        </footer>
    )
}

export default Footer
