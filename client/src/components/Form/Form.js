import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Chip, Container } from '@mui/material';
import FileBase from 'react-file-base64';
import { StyledForm, StyledButton, StyledPaper, StyledFileInput, StyledDivImageSection, StyledImgMedia } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreatePost, UpdatePost } from '../../actions/posts';

import food from './defaultImages/food.jpg';

const Form = ({ currentId, setCurrentId, genre, subgenre, list }) => {
    const [postData,setPostData] = useState({
      title:'', description:'', selectedFile:'', genre:genre, subgenre:subgenre, list:list, tags:[]
    });

    const [tagToAdd, setTagToAdd] = useState('');

    const handleAddTag = (e) => {
      if (e.key === 'Enter') {
        setTagToAdd('');
        setPostData({...postData,tags:[...postData.tags, tagToAdd]});
      }
    }


    const handleDeleteTag = (tagToDelete) => () => {
      setPostData({...postData,tags:postData.tags.filter((tag) => tag !== tagToDelete )});
    }  
    
    const { posts, createdPost } = useSelector((state) => state.postsSlice);

    
    const post = currentId ? posts.find((p)=>p._id===currentId) : null

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
      if(post) setPostData(post);
    },[post])

    const handleSubmit = (e) => {
      e.preventDefault();

      if (postData.title) {
        if (currentId===0 && postData.selectedFile ==='') {
          let defaultImage = '';
          if (postData.genre === 'music')
             {
              defaultImage = postData.list[0].image;
            } else if (postData.genre === 'food') {
              defaultImage = food;
            }
            dispatch(CreatePost({...postData, selectedFile: defaultImage, username: user?.result?.username}));;
        } else if (currentId===0) {
          dispatch(CreatePost({...postData, username: user?.result?.username}));
        } else {
        dispatch(UpdatePost(currentId, {...postData, username: user?.result?.username}));
        }
        clear();
        }
    }

    useEffect(()=> { //so that a newly createdPost will navigate user to its page
      if (createdPost) {
        navigate(`/posts/${createdPost._id}`)
      }
    },[createdPost, navigate])

    

    if(!user?.result?.name) {
      return(
        <StyledPaper>
          <Typography variant='h6' align='center'>
            Need to sign in
          </Typography>
        </StyledPaper>
      )
    }

    const clear = () => {
      setCurrentId(0);
      setPostData({title:'',description:'',tags:'',selectedFile:'', genre:genre, subgenre:subgenre, list:list});
    }
    
  return (
    <StyledPaper>
      <StyledForm autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId?'Edit':'Make'} a List</Typography>
        <TextField required autoFocus name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) =>setPostData({...postData, title:e.target.value})}/>
        <TextField name='description' variant='outlined' label='Description' fullWidth value={postData.description} onChange={(e) =>setPostData({...postData, description:e.target.value})}/>
        <TextField sx={{m:'10px 0'}} name='search' variant='outlined' label='Add Search Tags By Pressing Enter' fullWidth onKeyPress={(e)=>handleAddTag(e)} onChange={(e)=>setTagToAdd(e.target.value)} value={tagToAdd}/>
          {postData.tags.length  ? <Container>
          {postData.tags.map((tag,index)=> <Chip sx={{width:1/2, bgcolor:'primary.light', color:'white'}} key={index} onDelete={handleDeleteTag(tag)} label={tag}/>)}  </Container>: null}
        <StyledFileInput>
          <FileBase 
            type='file'
            multiple={false}
            onDone={({base64})=> setPostData({...postData,selectedFile:base64})}
          />
        </StyledFileInput>
        <StyledDivImageSection>
          <StyledImgMedia src={postData.selectedFile} />
        </StyledDivImageSection>
        <StyledButton sx={{bgcolor:'primary.main'}}variant='container' size='large' onClick={handleSubmit} fullWidth>Submit</StyledButton>
        <Button sx={{bgcolor:'secondary.main'}}variant='container' size='small' onClick={clear} fullWidth>Clear</Button>
      </StyledForm>
    </StyledPaper>
  )
}

export default Form