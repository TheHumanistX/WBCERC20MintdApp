import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Footer, Header, Main } from './components'

import Footer2 from './components/Footer2'
import { coin2 } from './assets'
import './App.css';


function App() {
  return (
    <ThirdwebProvider>
      <div className='app__wrapper'>
        <div>
          <Main />
        </div>
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
  );
}

export default App;
