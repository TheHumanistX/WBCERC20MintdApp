import React from 'react'
import { Header } from './'
import { ConnectWallet } from '@thirdweb-dev/react'

const Main = () => {
    return (
        <div className='main__wrapper'>
            <div className='main__spacer'></div>
            <div className='main__container'>
                <Header />
            </div>
        </div>
    )
}

export default Main
