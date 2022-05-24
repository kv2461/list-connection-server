import React from 'react'
import { StyledAppBar,StyledTypography, StyledAvatar, StyledContainer, StyledLogoutButton, StyledProfile, StyledToolbar, StyledUsername } from './styles';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();

    const user = null;

  return (
    <StyledAppBar position='static' color='inherit'>
        <StyledContainer>
            <StyledTypography variant='h2' align='center' onClick={()=>navigate('/')}>List Connection</StyledTypography> 
        </StyledContainer>
        <StyledToolbar>
            {user ? (
                <StyledProfile>
                    <StyledAvatar alt={user.result.username} src={user.result.imageUrl}>{user.result.username.charAt(0)}</StyledAvatar>
                    <StyledUsername variant='h6'>{user.result.username}</StyledUsername>
                    <StyledLogoutButton variant='contained' sx={{color:'secondary.main'}}>Logout</StyledLogoutButton>
                </StyledProfile>
            ) : (
                <Button  variant='contianed' sx={{color:'primary.main'}} onClick={()=>navigate('/auth')}>Sign In</Button>
            )}
        </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar