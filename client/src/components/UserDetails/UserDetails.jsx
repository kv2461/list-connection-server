import React, { useEffect, useState } from 'react';
import { Paper, Grow, Container,Grid, } from '@mui/material';
import { StyledGrid } from './styles';
// import { StyledDivImageSection, StyledDivSection, StyledImgMedia, StyledDivCard, StyledLoadingPaper } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

// import CommentSection from './CommentSection';
// import {GetPost} from '../../actions/posts';
// import ListDetails from './ListDetails/ListDetails';

import { GetPostsByUsername } from '../../actions/posts';
import { GetInfoByUsername } from '../../actions/users';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import UserForm from './UserForm/UserForm';

const UserDetails = ({setCurrentId, currentId}) => {
    // const { post, posts, isLoading, } = useSelector((state)=>state.postsSlice);
    const [userData, setUserData] = useState('');
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { username } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));

    const useViewport = () => {
      const [width, setWidth] = useState(window.innerWidth);
  
    
      useEffect(()=> {
          const handleWindowResize = () => setWidth(window.innerWidth);
          window.addEventListener('resize',handleWindowResize);
          return () => window.removeEventListener('resize', handleWindowResize);
      },[])
  
      return {width};
      }   
  
      const {width} = useViewport();
      const breakpoint = 500;


    useEffect(() => {

        const fetchData = async () => {
            const data = await dispatch(GetInfoByUsername(username))
            await setUserData(data[0]);
        }

    dispatch(GetPostsByUsername(username))

    fetchData();

    }, [username,dispatch])


    // if (!post) return null;

    // if(isLoading) {
    //   return ( <StyledLoadingPaper elevation={6}>
    //             <CircularProgress size='7em' />
    //         </StyledLoadingPaper> )
    // }
    
  return (
    <Grow in>
          <Container maxWidth='xl'>
            <StyledGrid container justify='space-between' alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {/* <StyledAppBarSearch position='static' sx={{bgcolor:'inherit'}}>
                    <TextField name='search' variant='outlined' label='Search List Name' fullWidth value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    <TextField sx={{m:'10px 0'}} name='search' variant='outlined' label='Add Search Tags By Pressing Enter' fullWidth onKeyPress={(e)=>handleAdd(e)} onChange={(e)=>setTagToAdd(e.target.value)} value={tagToAdd}/>
                    {tags.length > 0 ? <Container>
                    {tags.map((tag,index)=> <Chip sx={{width:1/2, bgcolor:'primary.light', color:'white'}} key={index} onDelete={handleDelete(tag)} label={tag}/>)}  </Container>: null}
                    <Button sx={{bgcolor:'primary.main',m:'10px 0'}} variant='contained' onClick={searchPost}>Search</Button>
                  </StyledAppBarSearch> */}
                  {user?.result?.username === username && userData && (<UserForm user={userData}/>)}
                  {currentId!==0 && (<Form currentId={currentId} setCurrentId={setCurrentId} />) }
                  {/* {(!searchQuery && !tags.length) && (<Paper elevation={6}>
                    <Pagination page={page} subgenreName={subgenreName} />
                  </Paper>)} */}
                </Grid>
            </StyledGrid>
          </Container>
    </Grow>
  )
}

export default UserDetails