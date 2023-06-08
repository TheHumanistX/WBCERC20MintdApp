import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
// import { Main } from './components';
import { ConnectionBalanceInfo, Footer, Header } from './components'
import './App.css';


function App() {
  return (
    <ThirdwebProvider>
    <div className='main__wrapper'>
            <div className='main__spacer'></div>
            <div className='main__container'>
                <Header />
                
                <ConnectionBalanceInfo />
                <Footer />
            </div>
        </div>
    </ThirdwebProvider>
  );
}

export default App;
