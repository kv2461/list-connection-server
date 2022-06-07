import React from 'react';
import {CardContent,Button,Typography} from '@mui/material';
import { StyledCard,StyledCardMedia,StyledTypography,StyledCardActions,StyledOverlay,StyledOverlay2,StyledDetails,StyledButtonBase } from './styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpOutlined'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DeletePost,LikePost } from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  //might remove 2nd styled overlay because not sure if i want to allow editing in main page...

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  }


  return (
    <StyledCard raised elevation={6}>
      <StyledButtonBase
      component='span'
      name='test'
      onClick={openPost}
      >
      <StyledCardMedia image={post.selectedFile} title={post.title}/>
      <StyledOverlay>
        <Typography variant='h6'>{post.username}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </StyledOverlay>

      {(user?.result?._id === post?.creator) && (<StyledOverlay2>
        <Button style={{color:'white'}} size='small' onClick={(e)=>{e.stopPropagation();setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize='default'/>
        </Button>
      </StyledOverlay2>)} 

      <StyledDetails>
        {post.tags?.length > 0 && <Typography variant='body2' sx={{color:'text.secondary'}}>{post.tags.map((tag)=>`#${tag} `)}</Typography>}
      </StyledDetails>
      <StyledTypography gutterBottom variant='h5' component='h2'>{post.title}</StyledTypography>
      <CardContent>
        <Typography variant='body2' sx={{color:'text.secondary'}} gutterBottom component='p'>{post.description}</Typography>
        <Typography variant='body2' sx={{color:'text.secondary',fontSize:'0.6rem'}} gutterBottom component='p'>{`Genre:${post?.genre?.toUpperCase()} Subgenre:${post?.subgenre?.toUpperCase()}`}</Typography>
      </CardContent>
      </StyledButtonBase>
      <StyledCardActions>
        <Button size='small' sx={{color:'primary.main'}} disabled={!user?.result} onClick={()=>dispatch(LikePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?._id === post?.creator) && (<Button size='small' sx={{color:'primary.main'}} onClick={()=>dispatch(DeletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>)}
      </StyledCardActions>
    </StyledCard>
  )
}

export default Post