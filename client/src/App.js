import React from 'react';
import { Container,} from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

function App() {

  return (
      <BrowserRouter>
        <Container maxWidth='lg'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Navigate to='/posts/'/>}/>
            <Route path='/posts' element={<Home />}/>
          </Routes>
        </Container>
      </BrowserRouter>
  );
}

export default App;
