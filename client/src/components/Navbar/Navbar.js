import React, {useState, useEffect} from 'react'
import { StyledAppBar,StyledTypography, StyledAvatar, StyledContainer, StyledLogoutButton, StyledProfile, StyledToolbar, StyledUsername } from './styles';
import {Button} from '@mui/material';
import {useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router';
import {LOGOUT} from '../../reducers/auth';
import decode from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(LOGOUT());

        navigate('/')
    }

    useEffect(()=> {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
            logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

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
                    <StyledLogoutButton variant='contained' sx={{backgroundColor:'secondary.main'}} onClick={logout} >Logout</StyledLogoutButton>
                </StyledProfile>
            ) : (
                <Button  variant='contained' sx={{backgroundColor:'primary.main'}} onClick={()=>navigate('/auth')}>Sign In</Button>
            )}
        </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar