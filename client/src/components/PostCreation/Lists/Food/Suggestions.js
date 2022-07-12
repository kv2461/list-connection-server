import React, { useState,useEffect } from 'react'
import { Grid, Box } from '@mui/material';
import { StyledCard, StyledTypography } from './styles'

const Suggestions = ({ item, image, ingredientName, subgenre, fetchInfo, handleClick }) => {
  const [name,setName] = useState('');
  const [reactKey, setReactKey] = useState('');
  

  useEffect(() => {

    switch(subgenre) {
      case 'foodRecipe':
        setName(ingredientName);
        setReactKey(item?.id)
        break;
      default:
        break;
    }


  },[ingredientName, subgenre, item?.id])
  
  return ( 
    <Grid key={reactKey} sx={{p:'5px'}} item xs={6} sm={4} md={6}>
      { subgenre==='foodRecipe' ?
        <StyledCard sx={{p:'5px'}} onClick={()=>fetchInfo(reactKey)}>
          <StyledTypography>{name}</StyledTypography>
         {image !== null && (<Box component='img' sx={{m:2,p:2}} src={image}/>)}
        </StyledCard> 
      : 
      <StyledCard sx={{p:'5px'}} onClick={handleClick}>
        <StyledTypography sx={{m:2,p:2}} >{name}</StyledTypography>
      </StyledCard> }
    </Grid>
  )
}

export default Suggestions