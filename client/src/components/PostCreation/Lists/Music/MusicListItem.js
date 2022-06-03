import React from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider, Button} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';


const MusicListItem = ({ listItem,index, handleDelete }) => {
  return (
    <li key={listItem?.key}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
            <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}}>{`${listItem?.trackName} by ${listItem?.artistName}`}</ListSubheader>
            <ListItem key={`${listItem?.key}-${index}`}>
                <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/>
                <ListItemText 
                  disableTypography 
                  primary={ <Typography fontSize='0.8rem'> {listItem.description ? `${listItem?.description}` :null } </Typography>}
                 />
                 <Button onClick={handleDelete}><DeleteForever/></Button>
            </ListItem>
        </ul>
    </li>
  )
}

export default MusicListItem