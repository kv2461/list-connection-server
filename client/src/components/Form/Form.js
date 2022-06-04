import React, {useState,useEffect} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import FileBase from 'react-file-base64';
import {StyledForm, StyledButton, StyledPaper, StyledFileInput } from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {CreatePost, UpdatePost} from '../../actions/posts';

const Form = ({ currentId, setCurrentId, genre, subgenre, list }) => {
    const [postData,setPostData] = useState({
      title:'', description:'', tags:'', selectedFile:'', genre:genre, subgenre:subgenre, list:list
    });
    const { posts } = useSelector((state) => state.postsSlice)
    
    const post = currentId ? posts.find((p)=>p._id===currentId) : null

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
      if(post) setPostData(post);
    },[post])

    const handleSubmit = (e) => {
      e.preventDefault();

      if(currentId===0) {
        dispatch(CreatePost({...postData, username: user?.result?.username}));
      } else {
      dispatch(UpdatePost(currentId, {...postData, username: user?.result?.username}));
      }
      clear();
    }

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
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) =>setPostData({...postData, title:e.target.value})}/>
        <TextField name='description' variant='outlined' label='Description' fullWidth value={postData.description} onChange={(e) =>setPostData({...postData, description:e.target.value})}/>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) =>setPostData({...postData, tags:e.target.value.split(',')})}/>
        <StyledFileInput>
          <FileBase 
            type='file'
            multiple={false}
            onDone={({base64})=> setPostData({...postData,selectedFile:base64})}
          />
        </StyledFileInput>
        <StyledButton sx={{bgcolor:'primary.main'}}variant='container' size='large' type='submit' fullWidth>Submit</StyledButton>
        <Button sx={{bgcolor:'secondary.main'}}variant='container' size='small' onClick={clear} fullWidth>Clear</Button>
      </StyledForm>
    </StyledPaper>
  )
}

export default Form