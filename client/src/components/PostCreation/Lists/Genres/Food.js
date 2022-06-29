import React from 'react'
import {Typography, Container, } from '@mui/material';
import {StyledGrid} from '../../styles'
import {MenuBook, Restaurant, Bookmarks} from '@mui/icons-material/';
import ListTypeCards from '../../ListTypeCard/ListTypeCards';
import { useNavigate } from 'react-router';

const ListType = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md'>
        <Typography component='h3' variant='h5' align='center' >What kind of music list are you making?</Typography>
        <StyledGrid container alignItems='stretch' spacing={3}>
            <ListTypeCards Icon={MenuBook} genre='Make a Recipe' handleClick={()=>navigate('/createpost/food/recipe')}/>
            <ListTypeCards Icon={Bookmarks} genre='Favorite Recipes' handleClick={()=>navigate('/createpost/movies')}/>
            <ListTypeCards Icon={Restaurant} genre='Favorite Restaurants' handleClick={()=>navigate('/createpost/movies')}/>
        </StyledGrid>
    </Container>

  )
}

export default ListType