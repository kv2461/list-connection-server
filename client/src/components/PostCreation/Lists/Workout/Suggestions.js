import React, { useState,useEffect } from 'react'
import { Grid , Box } from '@mui/material';
import { StyledCard, StyledTypography } from './styles'
const Suggestions = ({ image, workoutName, subgenre, handleClick, category, index }) => {
  const [name,setName] = useState('');
  

  useEffect(() => {

    switch(subgenre) {
      case 'workout':
        setName(workoutName);
        break;
      default:
        break;
    }


  },[subgenre,workoutName])
  
  return ( 
    <Grid key={index} sx={{p:'5px'}} item xs={6} sm={4} md={6}>
      { subgenre==='workout' && 
        <StyledCard sx={{p:'5px'}} onClick={handleClick}>
          <Box component='img' sx={{m:1,p:1, maxHeight:'100px', maxWidth:'100px'}} src={image}/>
          <StyledTypography>{name}</StyledTypography>
          <StyledTypography>for</StyledTypography>
          <StyledTypography>{category}</StyledTypography>
        </StyledCard> 
    }
    </Grid>
  )
}

export default Suggestions