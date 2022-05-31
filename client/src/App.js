import React, {useState} from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostCreation from './components/PostCreation/PostCreation';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const [currentId,setCurrentId] = useState(0);



  return (
      <BrowserRouter>
        <Container maxWidth='lg'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Navigate to='/posts/'/>}/>
            <Route path='/posts' element={<Home currentId={currentId} setCurrentId={setCurrentId}/>}/>
            <Route path='/auth' element={(user===null)?<Auth />:<Navigate to='/posts/'/>} />
            <Route path='/createPost' element={<PostCreation currentId={currentId} setCurrentId={setCurrentId}/>} />
          </Routes>
        </Container>
      </BrowserRouter>
  );
}

export default App;
