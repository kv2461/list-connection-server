import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { StyledDivImageSection, StyledDivSection, StyledImgMedia, StyledDivCard, StyledLoadingPaper } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import {GetPost} from '../../actions/posts';
import ListDetails from './ListDetails/ListDetails';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state)=>state.postsSlice);
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { id } = useParams();

    useEffect(() => {
      dispatch(GetPost(id));
    
    }, [id])


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
          <Typography variant='h3' component='h2'>{post.title}</Typography>
          <Typography sx={{color:'text.secondary'}} gutterBottom variant='h6' component='h2'>{post.tags.map((tag)=>`#${tag}`)}</Typography>
          <Typography gutterBottom variant='body1' component='p'>{post.description}</Typography>
          <Typography variant='h6'>Created by: {post.username}</Typography>
          <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
          <Divider sx={{m:'20px 0'}} />
          <Typography variant='body1'><strong>List Details</strong></Typography>
          <ListDetails post={post} list={post.list}/>
          <Divider sx={{m:'20px 0'}} />
          <Typography variant='body1'><strong>Comments Coming Soon</strong></Typography>
          <Divider sx={{m:'20px 0'}} />
        </StyledDivSection>
        <StyledDivImageSection>
          <StyledImgMedia src={post.selectedFile} alt={post.title}/>
        </StyledDivImageSection>
      </StyledDivCard>
    </Paper>
  )
}

export default PostDetails