import React from 'react'
import { ConnectionBalanceInfo, Footer, Header } from './'


const Main = () => {
    return (
        <div className='main__wrapper'>
            <div className='main__spacer'></div>
            <div className='main__container'>
                <Header />
                <ConnectionBalanceInfo />
                <Footer />
            </div>
        </div>
    )
}

export default Main
