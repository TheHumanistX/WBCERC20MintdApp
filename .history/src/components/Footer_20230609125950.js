import React from 'react'
import { useContract, useContractRead, useTokenDecimals  } from '@thirdweb-dev/react';

const Footer = () => {
    const contractAddress = "0xFB29697113015019c42E90fdBC94d9B4898D2602";
    const { contract } = useContract(contractAddress);
    console.log(`Contract: ${contract}`)
    const { data: supply } = useContractRead(contract, "totalSupply");
    const { data: decimals } = useTokenDecimals(contract);
    console.log(`Decimals: ${decimals}`)
    return (
        <footer>
            <div className='footer__container'>
                <div className='footer__circulatingSupply'>
                    CIRCULATING SUPPLY: <span>{supply && (supply / 1e18).toLocaleString()}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
