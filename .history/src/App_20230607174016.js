import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Footer, Header, Main } from './components'
import Main2 from './components/Main2'
import ConnectionBalanceInfo from './components/ConnectionBalanceInfo/ConnectionBalance';
import { coin2 } from './assets'
import './App.css';


function App() {
  return (
    <ThirdwebProvider>
    <div className='app__wrapper'>
      <div>
        <Main2 />
      </div>
      <img src={coin2} alt='TurtleCat!' />
      {/*   <div className='upper__spacer'></div>
            <div className='app__container'>
                <Header />
                <Main />
                <Footer />
            </div> */}
        </div>
    </ThirdwebProvider>
  );
}

export default App;
