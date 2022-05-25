import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
      <BrowserRouter>
        <Container maxWidth='lg'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Navigate to='/posts/'/>}/>
            <Route path='/posts' element={<Home />}/>
            <Route path='/auth' element={!user?<Auth />:<Navigate to='/posts/'/>} />
          </Routes>
        </Container>
      </BrowserRouter>
  );
}

export default App;
