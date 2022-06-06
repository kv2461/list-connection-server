import React, { useState,useEffect } from 'react'
import {Typography, Grid , Box } from '@mui/material';
import { StyledCard, StyledTypography } from './styles'
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
    <Grid item xs={6} sm={4} md={6}>
        <StyledCard onClick={handleClick}>
            <Box component='img' sx={{m:2,p:2}} src={img}/>
            <StyledTypography>{name}</StyledTypography>
            <StyledTypography>by</StyledTypography>
            <StyledTypography>{artistName}</StyledTypography>
        </StyledCard>
    </Grid>
  )
}

export default Suggestions