import React from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider} from '@mui/material';


const MusicListItem = ({listItem,index}) => {
  return (
    <li key={listItem?.key}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
            <ListSubheader sx={{fontWeight:700}}>{`${listItem?.trackName} by ${listItem?.artistName}`}</ListSubheader>
            <ListItem key={`${listItem?.key}-${index}`}>
                <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/>
                <ListItemText 
                  disableTypography 
                  primary={ <Typography fontSize='0.8rem'> {listItem.description ? `${listItem?.description}` :null } </Typography>}
                 />
            </ListItem>
        </ul>
    </li>
  )
}

export default MusicListItem