import { Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

const StyledPaper = styled(Paper, {})({
  padding: theme.spacing(2)
});

const StyledForm = styled('form',{})({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),},
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
})

const StyledFileInput = styled('div',{})({
    width: '97%',
    margin: '10px 0',
})

const StyledButton = styled(Button,{})({
  marginBottom: 10,
})

// const StyledClear = styled(Button,{})({
//   backgroundColor:theme.palette.secondary.main
// })



export {StyledPaper,StyledForm,StyledFileInput,StyledButton}
