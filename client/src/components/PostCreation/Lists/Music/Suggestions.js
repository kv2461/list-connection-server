import React, { useState,useEffect } from 'react'
import {Typography, Grid , Box } from '@mui/material';
import { StyledCard, } from './styles'
const Suggestions = ({ img, trackName, artistName, handleClick, albumName, genre}) => {
  const [name,setName] = useState('');

  useEffect(() => {

    const genrify = () => {
      if (genre === 'musicTracks') {
      setName(trackName);
      } else if (genre === 'musicAlbums') {
      setName(albumName);
      }
    }

    genrify();

  },[albumName,genre,trackName])
  
  return (
    <Grid item sm={3}>
        <StyledCard onClick={handleClick}>
            <Box component='img' sx={{m:2,p:2}} src={img}/>
            <Typography>{name}</Typography>
            <p>by</p>
            <Typography>{artistName}</Typography>
        </StyledCard>
    </Grid>
  )
}

export default Suggestions