import React, {useState, useEffect} from 'react'
import {Card, Avatar, Button, CircularProgress} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {GetPostsByUsername} from '../../../actions/posts';
import {FollowUser} from '../../../actions/users';
import {MessageUser} from '../../../actions/users';


const UserCard = ({user, loggedUser,setEditProfile, setUserData}) => {
    const { posts, isLoadingFollow } = useSelector((state) => state.postsSlice)
    const [followers, setFollowers] = useState(user.followers.length);
    const dispatch = useDispatch();

    const followUser = async (user) => {
        const data = await dispatch(FollowUser(user._id))
        await setUserData(data);

    }

    const messageUser = async (user) => {
        const value =
        {value:
            {sender:loggedUser.result.username,
            message:'Hello World!',
            id:`message-${Date.now()}`,
            createdAt: new Date(),
            }
        };
        const data = await dispatch(MessageUser(user._id, value))
        await console.log(data)
    }

    useEffect(() => {
        setFollowers(user.followers.length)
    },[dispatch, user])

   

  return (
    <Card>
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