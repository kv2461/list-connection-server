import React, { useState, useEffect } from 'react'
import { Card, Avatar, Button, CircularProgress, TextField, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

// import {GetPostsByUsername} from '../../../actions/posts';
import { FollowUser, GetChatById, MessageUser } from '../../../actions/users';


const UserCard = ({ user, loggedUser, setEditProfile, setUserData, setChat }) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const { posts, isLoadingFollow } = useSelector((state) => state.postsSlice)
    const [followers, setFollowers] = useState(user.followers.length);
    const dispatch = useDispatch();
    const [showNewMessage, setShowNewMessage] = useState(false);
    const [ message, setMessage ] = useState('');

    const followUser = async (user) => {
        const data = await dispatch(FollowUser(user._id))
        await setUserData(data);
    }

    const messageUser = async (user) => {
        const chatIdSort = [user,profile.result._id].sort();
        const chatId = `${chatIdSort[0]}-${chatIdSort[1]}`;

        const data = await dispatch(GetChatById(chatId));
        
        if (data) {
            setChat(true);
        } else {
            setShowNewMessage(true);
        }
    }

    const sendMessage = async (user) => {
        const value =
        {value:
            {sender:profile.result.username,
            message:message,
            id:`message-${Date.now()}`,
            createdAt: new Date(),
            }
        };
        await dispatch(MessageUser(user, value))

        messageUser(user);
    }

    useEffect(() => {
        setFollowers(user.followers.length)
    },[dispatch, user])

   

  return (
    <Card sx={{padding:'10px'}}>
        <Avatar alt={user.username} src={user.selectedFile}>{user.username.charAt(0)}</Avatar>
        <br/>
        Username: {user.username}
        <br/>
        Name: {user.name}
        <br/>
        Bio: {user.bio}

        <br/>
        Posts : {posts.length}
        <br />
        Followers : { !isLoadingFollow ? followers : ( <CircularProgress size='1em' />)}
        <br />
        Following : {user.following.length}


        {user.username !== loggedUser?.result?.username ? (<>
            <Button onClick={()=>followUser(user)}>Follow</Button>
            <Button onClick={()=>messageUser(user._id)}>Message</Button>
        </>)
        :
        (<>
            <Button onClick={()=>setEditProfile(true)}>Edit Profile</Button>
        </>)
        }
        {showNewMessage && (
                <>
                    <TextField autoFocus fullWidth value={message} onChange={(e)=>setMessage(e.target.value)}/>
                    <Container sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <Button onClick={()=> {setShowNewMessage(false)}}>Cancel</Button>
                        <Button onClick={()=>{sendMessage(user._id);setShowNewMessage(false);setMessage('')}}>Send</Button>
                    </Container>
                </>)}
    </Card>
  )
}

export default UserCard