import React, {useState} from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import ListType from './components/PostCreation/ListType';
import Music from './components/PostCreation/Lists/Music';
import Movies from './components/PostCreation/Lists/Movies';


import MusicTracks from './components/PostCreation/Lists/Music/MusicTracks';
import MusicAlbums from './components/PostCreation/Lists/Music/MusicAlbums';
import MusicArtists from './components/PostCreation/Lists/Music/MusicArtists';
import MusicCustom from './components/PostCreation/Lists/Music/MusicCustom';


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


            <Route path='/createpost' element={<ListType currentId={currentId} setCurrentId={setCurrentId}/>} />

                <Route path='/createpost/music' element={<Music currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musictracks' element={<MusicTracks currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musicalbums' element={<MusicAlbums currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musicartists' element={<MusicArtists currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musiccustom' element={<MusicCustom currentId={currentId} setCurrentId={setCurrentId}/>} />

                <Route path='/createpost/movies' element={<Movies currentId={currentId} setCurrentId={setCurrentId}/>} />

          </Routes>
        </Container>
      </BrowserRouter>
  );
}

export default App;
