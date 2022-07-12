import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, Divider, TextField, Typography, List, ListItem, Fab, Avatar, ListItemIcon, ListItemText, Button } from '@mui/material';
import { StyledChatSection, StyledBorderRight500, StyledMessageArea } from './styles';
import { Send as SendIcon } from '@mui/icons-material';
// import Draggable from 'react-draggable';// buttons don't work with it for now

import { useDispatch, useSelector } from 'react-redux';
import { GetAccountInfo, MessageUser, GetChatById, GetChatByIdPreview } from '../../actions/users';

import MessageAvatar from './ChatSub/MessageAvatar';
import ChatBubble from './ChatSub/ChatBubble';




const Chat = ({ setChat, newMessage, setNewMessage, newMessageParticipant, setNewMessageParticipant, mobile, }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { data, chat, chatLoading, chat_id, chat_participants, preview, messages, } = useSelector((state) => state.accountSlice);
  const messageKeys = data?.messages;
  const participantArray = messageKeys?.map((item)=>item.participants.filter((participant) => participant !== user.result._id));
  const participants = participantArray?.flat(1);
  const dispatch = useDispatch();
  const [chatMessage, setChatMessage] = useState('');
  const [AFK, setAFK] = useState(false);
  const [hideLeft, setHideLeft] = useState(false);

  useEffect(()=> {
    setHideLeft(true);
  }, [AFK])

  

  const chat_participant = chat_participants?.filter((participant)=>participant !== user.result._id)[0];

  const [chatId, setChatId] = useState(chat_id);

  const chatRef = useRef();


//   const getChat = async (id) => {
//      dispatch(GetChatById(id))
//   }

  const getChatPreview = async (id) => {
    if (AFK === false) {
    dispatch(GetChatByIdPreview(id))


    if ((preview?.messages?.length !== undefined) && (preview?.messages?.length !== chat?.messages?.length) && (preview?._id === chatId)) {
        dispatch(GetChatById(id));
        } 
    }
   }

  useEffect(()=> {
    dispatch(GetAccountInfo());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newMessage])


  useEffect(()=> {


    if (chatId && AFK === false) {
    const interval = setInterval(() => { 
        getChatPreview(chatId) 
        ; }, 1000); 
        return () => clearInterval(interval); 

    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chatLoading, dispatch, chatMessage, AFK])




  const messageUser = async (participant) => {
    if (chat_participants?.includes(participant)) {
        const value =
        { value:
            {sender:user?.result?.username,
            message:chatMessage,
            id:`message-${Date.now()}`,
            createdAt: new Date(),
            }
        }

        await dispatch(MessageUser(participant, value))
        setChatMessage('');
        setAFK(false);
        if (chat?.messages?.length > 0) {
            chatRef?.current?.scrollIntoView({ behavior: 'smooth'});
            }

    } else if (newMessage && participant === newMessageParticipant._id){
        const value =
        { value:
            {sender:user?.result?.username,
            message:chatMessage,
            id:`message-${Date.now()}`,
            createdAt: new Date(),
            }
        }
        
        await dispatch(MessageUser(participant, value))
        setChatMessage('');
        const userItems = [user?.result?._id,newMessageParticipant._id].sort();
        const userFirst = userItems[0];
        const userSecond = userItems[1];
        const tempChatId = `${userFirst}-${userSecond}`
        dispatch(GetChatById(tempChatId))
        setAFK(false);
        setNewMessage(false);
        setNewMessageParticipant('');
    
    }



}
    useEffect(()=> {
        if (chat?.messages?.length > 0) {
            chatRef?.current?.scrollIntoView({ behavior: 'smooth'});
            }



    },[chat])
    
    const handleFocus = () => {
        if (chat?.messages?.length > 0) {
        chatRef.current.scrollIntoView({ behavior: 'smooth'});
        }
        
        setAFK(false);


    };

    useEffect(()=> {
        setChatId(chat_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[AFK])



  return (

      <div style={!mobile ? {position:'fixed', zIndex:2,} : null}>
        <Grid container >
            <Grid item xs={!mobile ? 12 : 6} >
                <Typography variant="h5" className="header-message">Chat {newMessageParticipant} </Typography>
                {!mobile && <Button onClick={()=>{setChat(false);setNewMessage(false)}}>Exit</Button>}
                {hideLeft && mobile && <Button onClick={()=>setHideLeft(!hideLeft)}>Show</Button>}
            </Grid>
        </Grid>
        <StyledChatSection container component={Paper} >
            <StyledBorderRight500 item xs={!mobile ? 3 : 5} display={mobile && hideLeft ?'none' : null}>
                <List>
                    <ListItem button key="user">
                        <ListItemIcon>
                        <Avatar alt={user.result.username} src={user.result.selectedFile}>{user.result.username.charAt(0)}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={user.result.username}></ListItemText>
                    </ListItem>
                    {mobile && <Button onClick={()=>setHideLeft(!hideLeft)}>Hide</Button>}
                </List>
                <Divider />
                {/* <Grid item xs={!mobile ? 12 : 10} style={{padding: '10px'}}>
                    
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid> */}
                <Divider />
                <List>
                    {newMessage && <MessageAvatar newMessage={newMessage} setNewMessage={setNewMessage} newMessageParticipant={newMessageParticipant} setNewMessageParticipant={setNewMessageParticipant} setHideLeft={setHideLeft}/>}
                    { participants && messageKeys.map((message, index) =>(
                        
                        <MessageAvatar key={message.chat_id} index={index} userInfo={message} setChatId={setChatId} setAFK={setAFK} setNewMessage={setNewMessage}
                        />
                        ))
                    }
                  
                </List>
            </StyledBorderRight500>
            {hideLeft && !mobile && <Grid item xs={!mobile ? 9 : 12}>
                <StyledMessageArea>
                {!newMessage && messages && messages.map((message, index) =>(
                        
                        <ChatBubble key={message.id} index={index} message={message} account={user} length={chat?.messages?.length} chatRef={chatRef}
                        />
                        ))
                    }
                </StyledMessageArea>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={!mobile ? 11 : 10}>
                        <TextField id="outlined-basic-email" label="Type Something" value={chatMessage} fullWidth onChange={(e)=>setChatMessage(e.target.value)}  onFocus={(e)=>handleFocus(e.target.value)}/>
                    </Grid>
                    <Grid item xs={!mobile ? 1 : 1} align="right">
                        <Fab color="primary" aria-label="add" onClick={newMessage? ()=>messageUser(newMessageParticipant._id) : () => messageUser(chat_participant)}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid> }

            {hideLeft && mobile && <Grid item xs={!mobile ? 9 : 12}>
                <StyledMessageArea>
                { !newMessage && messages && messages.map((message, index) =>(
                        
                        <ChatBubble key={message.id} index={index} message={message} account={user} length={chat?.messages?.length} chatRef={chatRef}
                        />
                        ))
                    }
                </StyledMessageArea>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={!mobile ? 11 : 10}>
                        <TextField id="outlined-basic-email" label="Type Something" value={chatMessage} fullWidth onChange={(e)=>setChatMessage(e.target.value)}  onFocus={(e)=>handleFocus(e.target.value)}/>
                    </Grid>
                    <Grid item xs={!mobile ? 1 : 1} align="right">
                        <Fab color="primary" aria-label="add" onClick={newMessage? ()=>messageUser(newMessageParticipant._id) : () => messageUser(chat_participant)}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid> }
        </StyledChatSection>
      </div>
 
  );
}

export default Chat;