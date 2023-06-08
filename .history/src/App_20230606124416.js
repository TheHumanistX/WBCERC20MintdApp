import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Main } from './components';
import './App.css';


function App() {
  return (
    <ThirdwebProvider>
    <>
    <Main />
    </>
    </ThirdwebProvider>
  );
}

export default App;
