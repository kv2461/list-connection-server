import { Button, Paper, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

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

export const StyledBox = styled(Box,{})({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundBlendMode: 'darken',
})

export const StyledGrid = styled(Grid, {})({
  padding:theme.spacing(2),
});

// const StyledClear = styled(Button,{})({
//   backgroundColor:theme.palette.secondary.main
// })



