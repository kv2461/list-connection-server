import React, {useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {Container, Grow, Grid } from '@mui/material';
import { StyledGrid } from './styles';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { GetPosts } from '../../actions/posts';

const Home = () => {

  const [currentId,setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(GetPosts())
    },[currentId,dispatch])

  return (
    <Grow in>
          <Container>
            <StyledGrid container justify='space-between' alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </StyledGrid>
          </Container>
    </Grow>
  )
}

export default Home