import React, { useState, useEffect } from 'react'
import { Card, Avatar, Button, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

// import {GetPostsByUsername} from '../../../actions/posts';
import { FollowUser } from '../../../actions/users';


const UserCard = ({ user, loggedUser,setEditProfile, setUserData, setChat, chat, setNewMessage, setNewMessageParticipant }) => {
    const { posts, isLoadingFollow } = useSelector((state) => state.postsSlice)
    const [followers, setFollowers] = useState(user.followers.length);
    const dispatch = useDispatch();

    const followUser = async (user) => {
        const data = await dispatch(FollowUser(user._id))
        await setUserData(data);

    }

    // right now the messaging only works intuitively if a chat_id exists inside the userprivates object
    //steps needed
    //  step 1 - clicking on message -> this should open the chat box and have their avatar and information on the left as
    //if youve already messaged them
    // step 2 - if the user wants to look at someone else in their messages, the temporary avatar does not disappear due to state..
    // step 3 - once the message is sent, then the temporary avatar becomes permanent, so it must be cleared to avoid duplicates

    // const getChat = async () => {
    //     dispatch(GetChatById(userInfo.chat_id))
    //   }

    const messageUser = async (user) => {
        setChat(true);
        setNewMessage(true);
        setNewMessageParticipant(user);


        // const value =
        // {value:
        //     {sender:loggedUser.result.username,
        //     message:'Hello World!',
        //     id:`message-${Date.now()}`,
        //     createdAt: new Date(),
        //     }
        // };
        // const data = await dispatch(MessageUser(user._id, value))
        // await console.log(data)
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
            <Button onClick={()=>messageUser(user)}>Message</Button>
        </>)
        :
        (<>
            <Button onClick={()=>setEditProfile(true)}>Edit Profile</Button>
        </>)
        }
    </Card>
  )
}

export default UserCard