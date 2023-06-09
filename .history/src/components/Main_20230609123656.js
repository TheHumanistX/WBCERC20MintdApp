import React from 'react'
import { ConnectionBalanceInfo, MintBox, TransactionEvents } from './'


const Main = () => {
    return (
        <div className='main__container'>
            <ConnectionBalanceInfo />
            <TransactionEvents />
            <MintBox />
        </div>
    )
}

export default Main
