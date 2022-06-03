import React from 'react'
import {Typography, Container, } from '@mui/material';
import {StyledGrid} from '../styles'
import {ArtTrack, Album, InterpreterMode, MiscellaneousServices} from '@mui/icons-material/';
import ListTypeCards from '../ListTypeCard/ListTypeCards';
import { useNavigate } from 'react-router';

const ListType = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md'>
        <Typography component='h2' variant='h4' align='center'>What kind of music list are you making?</Typography>
        <StyledGrid container alignItems='stretch' spacing={3}>
            <ListTypeCards Icon={ArtTrack} genre='Music Tracks' handleClick={()=>navigate('/createpost/music/musictracks')}/>
            <ListTypeCards Icon={Album} genre='Music Albums' handleClick={()=>navigate('/createpost/music/musicalbums')}/>
            <ListTypeCards Icon={InterpreterMode} genre='Music Artists' handleClick={()=>navigate('/createpost/music/musicartists')}/>
            <ListTypeCards Icon={MiscellaneousServices} genre='Custom' handleClick={()=>navigate('/createpost/music/musiccustom')}/>
        </StyledGrid>
    </Container>

  )
}

export default ListType