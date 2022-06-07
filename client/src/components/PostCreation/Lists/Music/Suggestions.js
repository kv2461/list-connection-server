import React, { useState,useEffect } from 'react'
import {Typography, Grid , Box } from '@mui/material';
import { StyledCard, StyledTypography } from './styles'
const Suggestions = ({ img, trackName, artistName, albumName, subgenre, handleClick }) => {
  const [name,setName] = useState('');
  

  useEffect(() => {

    switch(subgenre) {
      case 'musicTracks':
        setName(trackName);
        break;
      case 'musicAlbums':
        setName(albumName);
        break;
      default:
        setName(trackName);
        break;
    }


  },[albumName,subgenre,trackName])
  
  return (
    <Grid sx={{p:'5px'}} item xs={6} sm={4} md={6}>
        <StyledCard sx={{p:'5px'}} onClick={handleClick}>
            <Box component='img' sx={{m:2,p:2}} src={img}/>
            <StyledTypography>{name}</StyledTypography>
            <StyledTypography>by</StyledTypography>
            <StyledTypography>{artistName}</StyledTypography>
        </StyledCard>
    </Grid>
  )
}

export default Suggestions