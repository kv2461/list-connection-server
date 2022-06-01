import React from 'react'
import {Typography, Container, } from '@mui/material';
import {StyledGrid} from './styles';
import {MusicNote, MovieFilter, FitnessCenter, ShoppingBasket} from '@mui/icons-material/';
import ListTypeCards from './ListTypeCard/ListTypeCards';
import { useNavigate } from 'react-router';

const ListType = ({currentId,setCurrentId}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md'>
        <Typography component='h2' variant='h4' align='center'>What kind of list are you making?</Typography>
        <StyledGrid container alignItems='stretch' spacing={3}>
            <ListTypeCards Icon={MusicNote} genre='Music' handleClick={()=>navigate('/createpost/music')}/>
            <ListTypeCards Icon={MovieFilter}genre='Movies' handleClick={()=>navigate('/createpost/movies')}/>
            <ListTypeCards Icon={FitnessCenter} genre='Workout'/>
            <ListTypeCards Icon={ShoppingBasket} genre='Shopping'/>
        </StyledGrid>
    </Container>

  )
}

export default ListType