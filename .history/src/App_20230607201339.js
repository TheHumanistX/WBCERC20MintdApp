import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Footer, Header, Main } from './components'
import Main2 from './components/Main2'
import Footer2 from './components/Footer2'
import { coin2 } from './assets'
import './App.css';


function App() {
  return (
    <ThirdwebProvider>
      <div className='gradient__overlay'>
        <div className='app__wrapper'>
          <div>
            <Main2 />
          </div>
          <img className='turtlecat__coin' src={coin2} alt='TurtleCat!' />
          {/*   <div className='upper__spacer'></div>
            <div className='app__container'>
                <Header />
                <Main />
                <Footer />
            </div> */}
        </div>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
