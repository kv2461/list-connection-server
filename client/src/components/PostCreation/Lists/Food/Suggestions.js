import React, { useState,useEffect } from 'react'
import {Grid, } from '@mui/material';
import { StyledCard, StyledTypography } from './styles'

const Suggestions = ({ brandName, brandOwner, ingredientName, subgenre, handleClick }) => {
  const [name,setName] = useState('');
  

  useEffect(() => {

    switch(subgenre) {
      case 'foodRecipe':
        setName(ingredientName);
        break;
      default:
        break;
    }


  },[ingredientName, subgenre])
  
  return ( 
    <Grid sx={{p:'5px'}} item xs={6} sm={4} md={6}>
      { subgenre==='foodRecipe' ?
        <StyledCard sx={{p:'5px'}} onClick={handleClick}>
          <StyledTypography>{name}</StyledTypography>
         {brandName && <StyledTypography>-{brandName}</StyledTypography>}
          {brandOwner && <StyledTypography>from {brandOwner}</StyledTypography>}
        </StyledCard> 
      : 
      <StyledCard sx={{p:'5px'}} onClick={handleClick}>
        <StyledTypography sx={{m:2,p:2}} >{name}</StyledTypography>
      </StyledCard> }
    </Grid>
  )
}

export default Suggestions