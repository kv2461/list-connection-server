import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, TextField, Button, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyledGrid, StyledAppBarSearch } from './styles';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { GetPostsBySearch, } from '../../actions/posts';
import Pagination from '../Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ currentId, setCurrentId }) => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [tagToAdd, setTagToAdd] = useState('');

  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const page = query.get('page') || 1;
  const subgenreName = query.get('subgenrename');
  const genreName = query.get('genrename');

  const searchQuery = query.get('searchQuery');
  const tagsQuery = query.get('tags');

  useEffect(() => {

    if (searchQuery || tagsQuery){ //use url parser
      dispatch(GetPostsBySearch({ search: searchQuery, tags: tagsQuery }));
    }


  },[searchQuery,tagsQuery, dispatch, subgenreName, page])

  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatch(GetPostsBySearch({ search, tags: tags.join(',') }));
         // this is redundant since it gets data before using the search query it navigates to
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/')
    }
  }

    const handleAdd = (e) => {
      if (e.key === 'Enter') {
        setTags([...tags,tagToAdd]);
        setTagToAdd('');
      }
    }


    const handleDelete = (tagToDelete) => () => {
      setTags((tags)=>tags.filter((tag) => tag !== tagToDelete));
    }

  return (
    <Grow in>
          <Container maxWidth='xl'>
            <StyledGrid container justify='space-between' alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledAppBarSearch position='static' sx={{bgcolor:'inherit'}}>
                    <TextField name='search' variant='outlined' label='Search List Name' fullWidth value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    <TextField sx={{m:'10px 0'}} name='search' variant='outlined' label='Add Search Tags By Pressing Enter' fullWidth onKeyPress={(e)=>handleAdd(e)} onChange={(e)=>setTagToAdd(e.target.value)} value={tagToAdd}/>
                    {tags.length > 0 ? <Container>
                    {tags.map((tag,index)=> <Chip sx={{width:1/2, bgcolor:'primary.light', color:'white'}} key={index} onDelete={handleDelete(tag)} label={tag}/>)}  </Container>: null}
                    <Button sx={{bgcolor:'primary.main',m:'10px 0'}} variant='contained' onClick={searchPost}>Search</Button>
                  </StyledAppBarSearch>
                  {currentId!==0 && (<Form currentId={currentId} setCurrentId={setCurrentId} />) }
                </Grid>
            </StyledGrid>
            {(!searchQuery && !tags.length) && (<Paper elevation={6}>
                    <Pagination page={page} subgenreName={subgenreName} genreName={genreName}/>
                  </Paper>)}
          </Container>
    </Grow>
  )
}

export default Home