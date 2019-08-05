import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
//import ButtonAppBar from './components/AppBar/Appbar';
import './styles/stylesheet.css';

// function App() {
//   return (
//     <div className='container'>
//      <h1>react front end</h1> 
//     </div>
//   );
// }

const App = () => (
  <BrowserRouter>
    {/* <ButtonAppBar /> */}
    <MainRouter />
  </BrowserRouter>
) // App

export default App;
