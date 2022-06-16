import React, { useState, useEffect } from 'react';
import { Paper, Grid, Divider, TextField, Typography, List, ListItem, Fab, Avatar, ListItemIcon, ListItemText, } from '@mui/material';
import { StyledChatSection, StyledBorderRight500, StyledMessageArea } from './styles';
import { Send as SendIcon } from '@mui/icons-material';
import Draggable from 'react-draggable';

import { useDispatch, useSelector } from 'react-redux';
import {GetAccountInfo} from '../../actions/users';

import MessageAvatar from './ChatSub/MessageAvatar';
import ChatBubble from './ChatSub/ChatBubble';


const Chat = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { data } = useSelector((state) => state.accountSlice);
  const dispatch = useDispatch();
  const messageKeys = data?.messages;
  const participantArray = messageKeys?.map((item)=>item.participants.filter((participant) => participant !== user.result._id));
  const participants = participantArray?.flat(1);


  useEffect(()=> {
    dispatch(GetAccountInfo());
    
  },[])


  return (
    <Draggable>
      <div style={{position:'fixed', zIndex:2,}}>
        <Grid container >
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <StyledChatSection container component={Paper} >
            <StyledBorderRight500 item xs={3} >
                <List>
                    <ListItem button key="user">
                        <ListItemIcon>
                        <Avatar alt={user.result.username} src={user.result.selectedFile}>{user.result.username.charAt(0)}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={user.result.username}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    { participants && messageKeys.map((message, index) =>(
                        
                        <MessageAvatar key={message.chat_id} index={index} userInfo={message}
                        />
                        ))
                    }
                  
                </List>
            </StyledBorderRight500>
            <Grid item xs={9}>
                <StyledMessageArea>
                    <ChatBubble />
                </StyledMessageArea>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </StyledChatSection>
      </div>
    </Draggable>
  );
}

export default Chat;