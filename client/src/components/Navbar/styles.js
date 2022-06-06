import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { fontSize, styled } from '@mui/system';
import { theme } from '../../Theme';

export const StyledAppBar = styled(AppBar, {})({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  });
  
  export const StyledTypography = styled(Typography,{})({
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    '&:hover':{
        cursor:'pointer',
        backgroundColor: 'rgba(128,128,128,0.1)'
    },
    fontSize:'3em',
    fontWeight:300,
  })

  export const StyledToolbar = styled(Toolbar,{})({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width:'auto'
    },
  })

  export const StyledProfile = styled('div',{})({
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems:'center',
    [theme.breakpoints.down('sm')]: {
      width:'auto',
      marginTop:20,
      justifyContent:'center',
    }
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
    textAlign: 'center',
  })

  export const StyledLogoutButton = styled(Button,{})({
      marginLeft:'20px',
  })

  export const StyledCreatePost = styled(Button,{})({
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    '&:hover':{
        cursor:'pointer',
        backgroundColor: 'rgba(128,128,128,0.1)'
    }
  })