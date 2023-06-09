import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Footer, Header, Main } from './components'
import { ContractProvider } from './context/ContractContext';
import './App.css';

const activeChain = "goerli"

function App() {
  return (
    <ContractProvider>
    <ThirdwebProvider activeChain={activeChain}>
      <div className='app__wrapper'>
        {/* <img className='turtlecat__coin' src={coin2} alt='TurtleCat!' /> */}
        <div className='upper__spacer'></div>
        <div className='app__container'>
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
      {/* <Footer2 /> */}

    </ThirdwebProvider>
    </ContractProvider>
  );
}

export default App;