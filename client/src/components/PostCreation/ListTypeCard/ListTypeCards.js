import React from 'react'
import { Typography, Grid } from '@mui/material';
import { StyledCard,StyledSvgIcon } from './styles'

const ListTypeCards = ({ Icon, genre, handleClick }) => {
  return (
    <Grid item xs={6} sm={4} md={3}>
        <StyledCard onClick={handleClick}>
            <StyledSvgIcon component={Icon}/>
            <Typography>{genre}</Typography>
        </StyledCard>
    </Grid>
  )
}

export default ListTypeCards