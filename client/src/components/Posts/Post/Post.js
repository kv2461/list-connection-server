import React from 'react';
import {CardContent,Button,Typography} from '@mui/material';
import { StyledCard,StyledCardMedia,StyledTypography,StyledCardActions,StyledOverlay,StyledOverlay2,StyledDetails } from './styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import {useDispatch} from 'react-redux';

import { DeletePost,LikePost } from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch();
  console.log(post);

  return (
    <StyledCard>
      <StyledCardMedia image={post.selectedFile} title={post.title}/>
      <StyledOverlay>
        <Typography variant='h6'>{post.username}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </StyledOverlay>
      <StyledOverlay2>
        <Button style={{color:'white'}} size='small' onClick={(e)=>{e.stopPropagation();setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize='default'/>
        </Button>
      </StyledOverlay2>
      <StyledDetails>
        <Typography variant='body2' sx={{color:'text.secondary'}}>{post.tags.map((tag)=>`#${tag} `)}</Typography>
      </StyledDetails>
      <StyledTypography gutterBottom variant='h5' component='h2'>{post.title}</StyledTypography>
      <CardContent>
        <Typography variant='body2' sx={{color:'text.secondary'}} gutterBottom component='p'>{post.description}</Typography>
      </CardContent>
      <StyledCardActions>
        <Button size='small' sx={{color:'primary.main'}} onClick={()=>dispatch(LikePost(post._id))}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;Like&nbsp;
          {post.likes.length}
        </Button>
        <Button size='small' sx={{color:'primary.main'}} onClick={()=>dispatch(DeletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </StyledCardActions>
    </StyledCard>
  )
}

export default Post