import { Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../../Theme';

export const StyledPaper = styled(Paper, {})({
  padding: theme.spacing(2)
});

export const StyledForm = styled('form',{})({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),},
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
})

export const StyledFileInput = styled('div',{})({
    width: '97%',
    margin: '10px 0',
})

export const StyledButton = styled(Button,{})({
  marginBottom: 10,
})


export const StyledDivImageSection = styled('div',{})({
  marginLeft:'20px',
  [theme.breakpoints.down('sm')]: {
      margin:'20px',
  },
});

export const StyledImgMedia = styled('img',{})({
  borderRadius:'20px',
  objectFit:'cover',
  width:'100%',
  maxWidth:'500px',
  maxHeight:'600px',
})


// const StyledClear = styled(Button,{})({
//   backgroundColor:theme.palette.secondary.main
// })