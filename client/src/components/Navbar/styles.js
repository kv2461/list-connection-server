import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

export const StyledAppBar = styled(AppBar, {})({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  });
  
  export const StyledTypography = styled(Typography,{})({
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  })

  export const StyledToolbar = styled(Toolbar,{})({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  })

  export const StyledProfile = styled('div',{})({
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  })

  export const StyledContainer = styled('div',{})({
    display: 'flex',
    alignItems: 'center',
  })

  export const StyledAvatar = styled(Avatar,{})({
    color: '#ffffff',
    backgroundColor: '#rgba(0,183,255, 1)',
  })

  export const StyledUsername = styled(Typography,{})({
    display: 'flex',
    alignItems: 'center',
  })

  export const StyledLogoutButton = styled(Button,{})({
      marginLeft:'20px',
  })

