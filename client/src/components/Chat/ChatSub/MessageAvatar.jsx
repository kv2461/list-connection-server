import React, { useState, useEffect } from 'react'
import { ListItemButton, ListItemIcon, Avatar, ListItemText,} from '@mui/material';
import { useDispatch, setChatId } from 'react-redux';

import { GetInfoById, GetChatById } from '../../../actions/users';

const MessageAvatar = ({index, userInfo, setAFK}) => {
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


  const getChat = async () => {
    setAFK(true);
    dispatch(GetChatById(userInfo.chat_id))
  }



  
  
  return (
    <ListItemButton key={index} onClick={()=>{setAFK(true);getChat();}}>
        <ListItemIcon>
        <Avatar alt={user?.username} src={user?.selectedFile}>{user?.username?.charAt(0)}</Avatar>
        </ListItemIcon>
        <ListItemText primary={user?.username}>{user?.username}</ListItemText>
        {/* <ListItemText secondary="online" align="right"></ListItemText> */}
    </ListItemButton>
  )
}

export default MessageAvatar