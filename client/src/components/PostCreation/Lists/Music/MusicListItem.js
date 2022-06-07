import React, { useState, useEffect } from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider, Button} from '@mui/material';
import { DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';


const MusicListItem = ({ listItem, index, handleDelete, length, handleMoveUp, handleMoveDown, subgenre}) => {
  const [hover, setHover] = useState(false)
  const [name,setName] = useState('');

  useEffect(() => {

    switch(subgenre) {
      case 'musicTracks':
        setName(listItem?.trackName);
        break;
      case 'musicAlbums':
        setName(listItem?.albumName);
        break;
      default:
        setName(listItem?.trackName);
        break;
    }


  },[listItem?.albumName,subgenre,listItem?.trackName])

  return (
    <li key={listItem?.key}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
            <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name} by ${listItem?.artistName}`}</ListSubheader>
            <ListItem key={`${listItem?.key}-${index}`}>
                  <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/>
                <ListItemText 
                  disableTypography 
                  primary={ <Typography fontSize='0.8rem'> {listItem.description ? `${listItem?.description}` :null } </Typography>}
                 />
                 {handleDelete ? <Button onClick={handleDelete}><DeleteForever/></Button> : null}
                 <Box sx={{display:'flex', flexDirection:'column'}}>
                      {index===0 ? null : <Button onClick={handleMoveUp}><KeyboardArrowUp/></Button>}
                      {index===length ? null : <Button onClick={handleMoveDown}><KeyboardArrowDown/></Button>}
                 </Box>
            </ListItem>
        </ul>
    </li>
  )
}

export default MusicListItem