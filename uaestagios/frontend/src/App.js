import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom'
import React from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Listing from './Components/Listings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/login' element={ <Login /> } />
        <Route path='/listings' element={<Listing /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
