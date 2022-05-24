import React, {useState, useEffect} from 'react';
import { Container, Grow, Grid } from '@mui/material';
import {StyledAppBar,StyledTypography} from './styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { GetPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form'

function App() {
  const [currentId,setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(GetPosts())
  },[currentId,dispatch])

  return (
      <Container maxWidth='lg'>
        <StyledAppBar position='static' color='inherit'>
          <StyledTypography variant='h2' align='center'>List Connection</StyledTypography>
        </StyledAppBar>
        <Grow in>
          <Container>
            <Grid container justify='space-between' alignItems='stretch' spacing={3} >
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
  );
}

export default App;
