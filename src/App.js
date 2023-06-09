import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Footer, Header, Main } from './components'
import './App.css';

const activeChain = "goerli"

function App() {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <div className='app__wrapper'>
        <div className='upper__spacer'></div>
        <div className='app__container'>
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
