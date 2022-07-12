import React, {useState, useEffect} from 'react'
import { StyledAppBar, StyledAvatar, StyledContainer, StyledLogoutButton, StyledProfile, StyledToolbar, StyledUsername, StyledCreatePost, StyledGrid } from './styles';
import { Button, Switch, Grid} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { LOGOUT } from '../../reducers/auth';
import decode from 'jwt-decode';

// import listConnectionLogo from './images/listConnectionLogo.png'
import listConnectionText from './images/listConnectionText.png'

import NavBarMenu from './NavbarMenu';

const Navbar = ({setChat, chat, setNewMessage, darkMode, setDarkMode}) => {
    const navigate = useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(LOGOUT());

        navigate('/')
    }

    const changeTheme = () => {
        setDarkMode(!darkMode);
      };

    useEffect(()=> {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
            logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])

  return (
    <StyledAppBar position='static' color='inherit'> 
        <StyledGrid width={'20%'} display='flex' flexDirection='row' container spacing={1}>    
            <Grid item xs={2} sm={2} md={3}>
          <NavBarMenu chat={chat} setChat={setChat} setNewMessage={setNewMessage} user={user} logout={logout}/>      
            </Grid>    
            <Grid item xs={2} sm={2} md={3}>
        <Switch checked={darkMode} onChange={changeTheme} />  
            </Grid>
        </StyledGrid>
        <StyledContainer>
            <img src={listConnectionText} alt='icon' height='45px' onClick={()=>navigate('/')}/> 
        </StyledContainer>
        <StyledToolbar>
            {user ? (
                <StyledProfile>
                    <StyledCreatePost variant='h2' disabled={!user?.result} align='center' onClick={()=>navigate('/createPost')}><AddIcon/></StyledCreatePost>
                    <StyledAvatar onClick={()=>{setChat(!chat);setNewMessage(false)}}alt={user.result.username} src={user.result.selectedFile}>{user.result.username.charAt(0)}</StyledAvatar>
                    <StyledUsername onClick={()=>{navigate(`/user/${user.result.username}`)}} variant='h6'>{user.result.username}</StyledUsername>
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