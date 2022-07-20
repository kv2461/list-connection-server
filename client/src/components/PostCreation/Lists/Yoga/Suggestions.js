import React, { useState,useEffect } from 'react'
import { Grid , Box } from '@mui/material';
import { StyledCard, StyledTypography } from './styles'
const Suggestions = ({ image, yogaPoseName, subgenre, handleClick, sanskrit, index }) => {
  console.log(yogaPoseName)
  console.log(sanskrit)
  const [name,setName] = useState('');

  useEffect(() => {

    switch(subgenre) {
      case 'yoga':
        setName(yogaPoseName);
        break;
      default:
        break;
    }


  },[subgenre,yogaPoseName])
  
  return ( 
    <Grid key={index} sx={{p:'5px'}} item xs={6} sm={4} md={6}>
      { subgenre==='yoga' && 
        <StyledCard sx={{p:'5px'}} onClick={handleClick}>
          <Box component='img' sx={{m:1,p:1, maxHeight:'100px', maxWidth:'100px'}} src={image}/>
          <StyledTypography>{name}</StyledTypography>
          <StyledTypography>{sanskrit}</StyledTypography>
        </StyledCard> 
    }
    </Grid>
  )
}

export default Suggestions