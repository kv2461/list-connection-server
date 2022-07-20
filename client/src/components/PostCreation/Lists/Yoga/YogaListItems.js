import React, { useState, useEffect } from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider, Button } from '@mui/material';
import { DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';


const YogaListItem = ({ listItem, index, handleDelete, length, handleMoveUp, handleMoveDown, subgenre }) => {
  const [name,setName] = useState('');

  useEffect(() => {

    switch(subgenre) {
      case 'yoga':
        setName(listItem?.yogaPoseName);
        break;
      default:
        setName(listItem?.yogaPoseName);
        break;
    }


  },[subgenre,listItem?.yogaPoseName])

  return (
    <li key={listItem?.key}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}

             <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name} AKA ${listItem.sanskrit}`}</ListSubheader>
            
            <ListItem key={`${listItem?.key}-${index}`}>
                  <Box sx={{p:1, maxHeight:'80px', maxWidth:'80px'}} component='img' src={listItem.image}/>
                <ListItemText 
                  disableTypography 
                  primary={ 
                    <Typography fontSize='0.8rem'> {listItem.description ? `${listItem?.description}` :null } </Typography>}
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

export default YogaListItem