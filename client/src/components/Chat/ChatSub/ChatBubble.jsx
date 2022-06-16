import React from 'react'
import {ListItem, Grid, ListItemText} from '@mui/material';

const ChatBubble = () => {
  return (
    <>
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
            </Grid>
        </ListItem>

        <ListItem key="2">
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    </>
  )
}

export default ChatBubble