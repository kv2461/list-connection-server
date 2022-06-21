import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, ButtonBase } from '@mui/material';
import { StyledDivImageSection, StyledDivSection, StyledImgMedia, StyledDivCard, StyledLoadingPaper } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import CommentSection from './CommentSection';
import {GetPost} from '../../actions/posts';
import ListDetails from './ListDetails/ListDetails';

const PostDetails = () => {
    const { post, posts, isLoading, } = useSelector((state)=>state.postsSlice);
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { id } = useParams();

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
      dispatch(GetPost(id));
    
    }, [id,dispatch])

    const openUser = ()=> {
      navigate(`/user/${post.username}`)
    }


    if (!post) return null;

    if(isLoading) {
      return ( <StyledLoadingPaper elevation={6}>
                <CircularProgress size='7em' />
            </StyledLoadingPaper> )
    }
    
  return (
    <Paper sx={{p:'20px', borderRadius:'15px'}} elevation={6}>
      <StyledDivCard>
        <StyledDivSection>
          <Typography align='center' variant={width>breakpoint? 'h3' : 'h6'} component={width>breakpoint? 'h2' : 'h6'}>{post.title}</Typography>
          {width<breakpoint && <StyledDivImageSection>
          <StyledImgMedia src={post.selectedFile} alt={post.title}/>
        </StyledDivImageSection>}
          <Typography align='center' sx={{color:'text.secondary'}} gutterBottom variant={width>breakpoint? 'h6' : 'h12'} component={width>breakpoint? 'h2' : 'h6'}>{post.tags.map((tag)=>`#${tag}`)}</Typography>
          <Typography align='center' gutterBottom variant='body1' component='p'>{post.description}</Typography>
          <Typography align='center' variant='h6'>Created by:<ButtonBase onClick={openUser}><Typography variant='h5'>{post.username}</Typography></ButtonBase> </Typography>
          <Typography align='center' variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
          <Divider sx={{m:'20px 0'}} />
          {post.genre==='music' && <ListDetails post={post} list={post.list}/>}
          {post.genre==='food' && <ListDetails post={post} list={post.list}/>}
          {post.genre==='workout' && <ListDetails post={post} list={post.list}/>}
          <Divider sx={{m:'20px 0'}} />
          
          <CommentSection post={post} />

          <Divider sx={{m:'20px 0'}} />
        </StyledDivSection>
        {width>breakpoint && <StyledDivImageSection>
          <StyledImgMedia src={post.selectedFile} alt={post.title}/>
        </StyledDivImageSection>}
      </StyledDivCard>
    </Paper>
  )
}

export default PostDetails