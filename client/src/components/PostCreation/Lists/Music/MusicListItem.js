import React from 'react'
import { ListSubheader, ListItem, ListItemText, Typography } from '@mui/material';


const MusicListItem = ({listItem,index}) => {
  return (
    <li key={listItem?.key}>
        <ul>
            <ListSubheader>{`${listItem?.trackName} by ${listItem?.artistName}`}</ListSubheader>
            <ListItem key={`${listItem?.key}-${index}`}>
                <ListItemText 
                  disableTypography 
                  primary={ <Typography fontSize='0.9rem'> {listItem.description ? `${listItem?.description}` :null } </Typography>}
                 />
            </ListItem>
        </ul>
    </li>
  )
}

export default MusicListItem