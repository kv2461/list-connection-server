import React from 'react'
import { Typography, Container } from '@mui/material';
import { StyledGrid } from './styles';
import { MusicNote, MovieFilter, FitnessCenter, EggAlt } from '@mui/icons-material/'; //ShoppingBasket
import ListTypeCards from './ListTypeCard/ListTypeCards';
import { useNavigate } from 'react-router';

const ListType = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md'>
        <Typography component='h3' variant='h5' align='center'>What kind of list are you making?</Typography>
        <StyledGrid container alignItems='stretch' spacing={3}>
            <ListTypeCards Icon={MusicNote} genre='Music' handleClick={()=>navigate('/createpost/music')}/>
            <ListTypeCards Icon={MovieFilter}genre='Yoga' handleClick={()=>navigate('/createpost/movies')}/>
            <ListTypeCards Icon={FitnessCenter} genre='Workout' handleClick={()=>navigate('/createpost/workout')}/>
            <ListTypeCards Icon={EggAlt} genre='Food' handleClick={()=>navigate('/createpost/food')} />
        </StyledGrid>
    </Container>

  )
}

export default ListType