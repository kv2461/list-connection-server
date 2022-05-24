import React, {useState} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import FileBase from 'react-file-base64';
import {StyledForm, StyledButton, StyledPaper, StyledFileInput } from './styles';

const Form = () => {
    const [postData,setPostData] = useState({
      creator:'', title:'', description:'', tags:'', selectedFile:'',
    });


    const handleSubmit = () => {

    }

    const clear = () => {
      
    }
    
  return (
    <StyledPaper>
      <StyledForm autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Typography variant='h6'>Make a List</Typography>
        <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) =>setPostData({...postData, creator:e.target.value})}/>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) =>setPostData({...postData, title:e.target.value})}/>
        <TextField name='description' variant='outlined' label='Description' fullWidth value={postData.description} onChange={(e) =>setPostData({...postData, description:e.target.value})}/>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) =>setPostData({...postData, tags:e.target.value})}/>
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