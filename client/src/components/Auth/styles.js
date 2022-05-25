import { Paper, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

export const StyledPaper = styled(Paper, {})({
    marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
  });

export const StyledAvatar = styled(Avatar,{})({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
})

export const StyledForm = styled('form',{})({
    width: '100%', 
      marginTop: theme.spacing(3),
})

export const StyledSubmitButton = styled(Button,{})({
    margin: theme.spacing(3, 0, 2),
})
