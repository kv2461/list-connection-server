import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, ButtonBase, Container } from '@mui/material';
import { StyledDivImageSection, StyledDivSection, StyledImgMedia, StyledDivCard, StyledLoadingPaper, StyledRecommendedPosts } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import CommentSection from './CommentSection';
import { GetPost, GetPostsBySearch } from '../../actions/posts';
import ListDetails from './ListDetails/ListDetails';

const PostDetails = () => {
    const { post, posts, isLoading, } = useSelector((state)=>state.postsSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    useEffect(() => {
      if (post) {
        dispatch(GetPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
      }
    }, [post, dispatch]);
  
    if (!post) return null;

    const openUser = ()=> {
      navigate(`/user/${post.username}`)
    }

    const openPost = (_id)=> {
      navigate(`/posts/${_id}`)
    }

    if (!post) return null;

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    if(isLoading) {
      return ( <StyledLoadingPaper elevation={6}>
                <CircularProgress size='7em' />
            </StyledLoadingPaper> )
    }
    
  return (
    <Paper sx={{p:'20px', borderRadius:'15px'}} elevation={6}>
      <StyledDivCard>
        <StyledDivSection>
          <Container sx={{display:'flex', flexDirection:'column'}}>
          <Typography align='center' variant={width>breakpoint? 'h3' : 'h6'} component={width>breakpoint? 'h2' : 'h6'}>{post.title}</Typography>
          {width<breakpoint && <StyledDivImageSection>
          <StyledImgMedia src={post.selectedFile} alt={post.title}/>
        </StyledDivImageSection>}
          {/* <Typography align='center' sx={{color:'text.secondary'}} gutterBottom variant={width>breakpoint? 'h6' : 'h12'} component={width>breakpoint? 'h2' : 'h6'}>{post.tags.map((tag)=>`#${tag}`)}</Typography> */}
          <Typography align='center' gutterBottom variant='body1' component='p'>{post.description}</Typography>
          <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Typography align='center' variant='h6'>Created by:</Typography>
          <ButtonBase onClick={openUser}><Typography variant='h5'>{post.username}</Typography></ButtonBase> 
          </div>
          <Typography align='center' variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
          </Container>

          <Divider sx={{m:'20px 0'}} />
          {post.genre==='music' && <ListDetails post={post} list={post.list}/>}
          {post.genre==='food' && <ListDetails post={post} list={post.list}/>}
          {post.genre==='workout' && <ListDetails post={post} list={post.list}/>}
          {post.genre==='yoga' && <ListDetails post={post} list={post.list}/>}
          <Divider sx={{m:'20px 0'}} />
          
          <CommentSection post={post} />

          <Divider sx={{m:'20px 0'}} />
        </StyledDivSection>
        {width>breakpoint && <StyledDivImageSection>
          <StyledImgMedia src={post.selectedFile} alt={post.title}/>
        </StyledDivImageSection>}
      </StyledDivCard>

      {!!recommendedPosts.length && (
        <StyledDivSection>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <StyledRecommendedPosts>
            {recommendedPosts.map(({ title, username, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{username}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} alt='list cover art' width="200px" />
              </div>
            ))}
          </StyledRecommendedPosts>
        </StyledDivSection>
      )}
    </Paper>
  )
}

export default PostDetails