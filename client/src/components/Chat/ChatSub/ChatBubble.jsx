import React from 'react'
import moment from 'moment'
import {ListItem, Grid, ListItemText} from '@mui/material';

const ChatBubble = ({message,account,index,length,chatRef}) => {
    let alignment = 'left'

    if (message.sender === account.result.username) {
        alignment = 'right';
    } 

  return (
    <>
        <ListItem ref={length-1 === index ? chatRef : null}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={alignment} primary={message.message}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={alignment} secondary={moment(message.createdAt).fromNow()}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    </>
  )
}

export default ChatBubble