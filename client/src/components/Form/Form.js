import React, {useState,useEffect} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import FileBase from 'react-file-base64';
import {StyledForm, StyledButton, StyledPaper, StyledFileInput } from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {CreatePost, UpdatePost} from '../../actions/posts';

const Form = ({currentId,setCurrentId}) => {
    const [postData,setPostData] = useState({
      username:'', title:'', description:'', tags:'', selectedFile:'',
    });
    const post = useSelector((state)=>currentId?state.postsSlice.find((p)=>p._id===currentId):null);

    const dispatch = useDispatch();

    useEffect(()=>{
      if(post) setPostData(post);
    },[post])

    const handleSubmit = (e) => {
      e.preventDefault();

      if(currentId) {
        dispatch(UpdatePost(currentId, postData));
      } else {
      dispatch(CreatePost(postData));
      }
      clear();
    }

    const clear = () => {
      setCurrentId(0);
      setPostData({username:'',title:'',description:'',tags:'',selectedFile:''});
    }
    
  return (
    <StyledPaper>
      <StyledForm autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId?'Edit':'Make'} a List</Typography>
        <TextField name='username' variant='outlined' label='Username' fullWidth value={postData.username} onChange={(e) =>setPostData({...postData, username:e.target.value})}/>
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