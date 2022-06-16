import React, { useState, useEffect } from 'react'
import { ListItemButton, ListItemIcon, Avatar, ListItemText,} from '@mui/material';
import { useDispatch, } from 'react-redux';

import { GetInfoById } from '../../../actions/users';
import { GetChatById } from '../../../actions/users';

const MessageAvatar = ({index, userInfo}) => {
  const dispatch = useDispatch();
  const [user,setUser] = useState({});
  const logged = JSON.parse(localStorage.getItem('profile'));
  const user_id = userInfo.participants.filter((participant) => participant !== logged.result._id)[0];


  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(GetInfoById(user_id));

      await setUser(data);
    }
    
    fetchData();
  }, [])

  const getChat = () => {
    dispatch(GetChatById(userInfo.chat_id))
  }

  
  
  return (
    <ListItemButton key={index} onClick={()=>getChat()}>
        <ListItemIcon>
        <Avatar alt={user?.username} src={user?.selectedFile}>{user?.username?.charAt(0)}</Avatar>
        </ListItemIcon>
        <ListItemText primary={user?.username}>{user?.username}</ListItemText>
        {/* <ListItemText secondary="online" align="right"></ListItemText> */}
    </ListItemButton>
  )
}

export default MessageAvatar