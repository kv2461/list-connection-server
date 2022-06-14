import React from 'react';
import {CardContent,Button,Typography} from '@mui/material';
import { StyledCard,StyledCardMedia,StyledTypography,StyledCardActions,StyledOverlay,StyledOverlay2,StyledDetails,StyledButtonBase, } from './styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpOutlined'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DeletePost,LikePost } from '../../../actions/posts';
import More from './More';
import GenreIcon from './GenreIcon';

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
  
  const openUser = ()=> {
    navigate(`/user/${post.username}`)
  }


  return (
    <StyledCard raised elevation={6}>
      <StyledCardMedia image={post.selectedFile} title={post.title}/>
      <StyledOverlay>
        <StyledButtonBase onClick={openUser}>
          <Typography variant='h6'>{post.username}</Typography>
        </StyledButtonBase>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </StyledOverlay>

      {(user?.result?._id === post?.creator) && (<StyledOverlay2>
        <Button style={{color:'white'}} size='small' onClick={(e)=>{e.stopPropagation();setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize='default'/>
        </Button>
      </StyledOverlay2>)} 
      <StyledButtonBase onClick={openPost}>
        <StyledTypography align='center' variant='h5' component='h2'>{post.title}</StyledTypography>
      </StyledButtonBase>
      <CardContent>
        <More message={post.description} limit={25} variant='body2' sx={{fontSize:'0.9rem',color:'text.primary'}} component='p'/>
        <StyledDetails >
          {post.tags?.length > 0 && <More variant='body2'  limit={3} sx={{fontSize:'0.6rem',color:'text.secondary'}} message={post.tags.map((tag)=>`#${tag} `)} />}
        </StyledDetails>
        <Typography variant='body2' sx={{color:'text.secondary',fontSize:'0.6rem'}} component='p'>
          Genre:{<GenreIcon genre={post.genre}/>} 
          Subgenre:{<GenreIcon subgenre={post.subgenre}/>} 
        </Typography>
      </CardContent>
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