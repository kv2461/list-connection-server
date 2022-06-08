import React, { useState,useEffect } from 'react'
import { Grid , Box } from '@mui/material';
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
      case 'musicArtists':
        setName(artistName);
        break;
      default:
        break;
    }


  },[albumName,subgenre,trackName, artistName])
  
  return ( 
    <Grid sx={{p:'5px'}} item xs={6} sm={4} md={6}>
      { subgenre==='musicTracks' || subgenre === 'musicAlbums' ?
        <StyledCard sx={{p:'5px'}} onClick={handleClick}>
          <Box component='img' sx={{m:2,p:2}} src={img}/>
          <StyledTypography>{name}</StyledTypography>
          <StyledTypography>by</StyledTypography>
          <StyledTypography>{artistName}</StyledTypography>
        </StyledCard> 
      : 
      <StyledCard sx={{p:'5px'}} onClick={handleClick}>
        <Box component='img' src={img}/>
        <StyledTypography sx={{m:2,p:2}} >{name}</StyledTypography>
      </StyledCard> }
    </Grid>
  )
}

export default Suggestions