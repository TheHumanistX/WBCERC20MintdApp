import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { EthersProvider } from './context/EthersContext'
import { Footer, Header, Main } from './components'
import './App.css';

const activeChain = "goerli"

function App() {
  return (
    <ThirdwebProvider activeChain={activeChain}>
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
