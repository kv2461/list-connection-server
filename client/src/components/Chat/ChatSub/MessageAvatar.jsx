import React, { useState, useEffect } from 'react'
import { ListItem, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import { GetInfoById } from '../../../actions/users';
import { useDispatch, useSelector } from 'react-redux';

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
  
  
  return (
    <ListItem button key={index} onClick={()=>{}}>
        <ListItemIcon>
        <Avatar alt={user?.username} src={user?.selectedFile}>{user?.username?.charAt(0)}</Avatar>
        </ListItemIcon>
        <ListItemText primary={user?.username}>{user?.username}</ListItemText>
        {/* <ListItemText secondary="online" align="right"></ListItemText> */}
    </ListItem>
  )
}

export default MessageAvatar