import React, { useState, useEffect } from 'react'
import { ListItemButton, ListItemIcon, Avatar, ListItemText,} from '@mui/material';
import { useDispatch, setChatId } from 'react-redux';

import { GetInfoById, GetChatById } from '../../../actions/users';

const MessageAvatar = ({index, userInfo, setAFK, newMessage, setNewMessage, newMessageParticipant}) => {
  const dispatch = useDispatch();
  const [user,setUser] = useState({});
  const logged = JSON.parse(localStorage.getItem('profile'));
  var user_temp = undefined;

  if(newMessage) {
    user_temp = newMessageParticipant;
  }
  const user_id = userInfo?.participants?.filter((participant) => participant !== logged.result._id)[0];


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
    setNewMessage(false);
  }


  const getNewChat = () => {
    console.log('hi')
  }
  
  
  return (
    <ListItemButton key={index} onClick={newMessage? () => getNewChat() : () =>{setAFK(true);getChat();}}>
        <ListItemIcon>
          {newMessage && <Avatar alt={user_temp?.username} src={user_temp?.selectedFile}>{user_temp?.username?.charAt(0)}</Avatar>}
          {!newMessage && <Avatar alt={user?.username} src={user?.selectedFile}>{user?.username?.charAt(0)}</Avatar>}
        </ListItemIcon>
        {newMessage && <ListItemText primary={user_temp?.username}>{user_temp?.username}</ListItemText>}
        {!newMessage && <ListItemText primary={user?.username}>{user?.username}</ListItemText>}
        {/* <ListItemText secondary="online" align="right"></ListItemText> */}
    </ListItemButton>
  )
}

export default MessageAvatar