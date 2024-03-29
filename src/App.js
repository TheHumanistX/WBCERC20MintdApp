import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { EthersProvider } from './context/EthersContext'
import { Footer, Header, Main } from './components'
import './App.css';

const activeChain = "goerli"

function App() {

  return (
    <ThirdwebProvider activeChain={activeChain} clientId="254e923d35d33a1d5f3891f97b0afb8ec1b96c268373f52c861cc97147a0204cf4a20e366893ceedf87c29795b921549418feed9b1348c22495c6e5da34277ea">
      <EthersProvider>
          <div className='app__wrapper'>
            <div className='upper__spacer'></div>
            <div className='app__container'>
              <Header />
              <Main />
              <Footer />
            </div>
          </div>
      </EthersProvider>
    </ThirdwebProvider>
  );
}

export default App;
