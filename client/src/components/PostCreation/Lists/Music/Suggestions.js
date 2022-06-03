import React from 'react'
import {Typography, Grid , Box } from '@mui/material';
import { StyledCard, } from './styles'
const Suggestions = ({ img, trackName, artistName, handleClick}) => {
  return (
    <Grid item sm={3}>
        <StyledCard onClick={handleClick}>
            <Box component='img' sx={{m:2,p:2}} src={img}/>
            <Typography>{trackName}</Typography>
            <p>by</p>
            <Typography>{artistName}</Typography>
        </StyledCard>
    </Grid>
  )
}

export default Suggestions