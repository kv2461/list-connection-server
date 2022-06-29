import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles'
import { theme, darkTheme } from './Theme';

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import UserDetails from './components/UserDetails/UserDetails';

import Chat from './components/Chat/Chat';

import ListType from './components/PostCreation/ListType';
import Music from './components/PostCreation/Lists/Genres/Music';
import Movies from './components/PostCreation/Lists/Genres/Movies';
import Food from './components/PostCreation/Lists/Genres/Food';


import MusicTracks from './components/PostCreation/Lists/Music/MusicTracks';
import MusicAlbums from './components/PostCreation/Lists/Music/MusicAlbums';
import MusicArtists from './components/PostCreation/Lists/Music/MusicArtists';
import MusicCustom from './components/PostCreation/Lists/Music/MusicCustom';


import Recipes from './components/PostCreation/Lists/Food/Recipe';
import Workout from './components/PostCreation/Lists/Workout/Workout';



const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [darkMode, setDarkMode] = useState(false);
  const [chat, setChat] = useState(false);
  const [currentId,setCurrentId] = useState(0);
  const [newMessage, setNewMessage] = useState(false);
  const [newMessageParticipant, setNewMessageParticipant] = useState('');



  return (
    <ThemeProvider theme={!darkMode ? theme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth='xl' style={{zIndex:1}}>
          <NavBar setChat={setChat} chat={chat} setNewMessage={setNewMessage} setDarkMode={setDarkMode} darkMode={darkMode}/>
          {chat && <Chat setChat={setChat} newMessage={newMessage} setNewMessage={setNewMessage} newMessageParticipant={newMessageParticipant} setNewMessageParticipant={setNewMessageParticipant} />}
          <Routes>
            <Route path='/' element={<Navigate to='/posts/'/>}/>
            <Route path='/posts' element={<Home currentId={currentId} setCurrentId={setCurrentId}/>}/>
            <Route path='/posts/search' element={<Home currentId={currentId} setCurrentId={setCurrentId}/>} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/auth' element={<Auth />} />


            <Route path='/user/:username' element={<UserDetails setCurrentId={setCurrentId} currentId={currentId} setChat={setChat} chat={chat} newMessage={newMessage} setNewMessage={setNewMessage} newMessageParticipant={newMessageParticipant} setNewMessageParticipant={setNewMessageParticipant}/>}/>


            <Route path='/createpost' element={<ListType currentId={currentId} setCurrentId={setCurrentId}/>} />

                <Route path='/createpost/music' element={<Music currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musictracks' element={<MusicTracks currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musicalbums' element={<MusicAlbums currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musicartists' element={<MusicArtists currentId={currentId} setCurrentId={setCurrentId}/>} />
                    <Route path='/createpost/music/musiccustom' element={<MusicCustom currentId={currentId} setCurrentId={setCurrentId}/>} />

                <Route path='/createpost/movies' element={<Movies currentId={currentId} setCurrentId={setCurrentId}/>} />

                <Route path='createpost/workout' element={<Workout currentId={currentId} setCurrentId={setCurrentId}/>} />

                <Route path='/createpost/food' element={<Food currentId={currentId} setCurrentId={setCurrentId}/>} />
                  <Route path='/createpost/food/recipe' element={<Recipes currentId={currentId} setCurrentId={setCurrentId}/>} />

          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
