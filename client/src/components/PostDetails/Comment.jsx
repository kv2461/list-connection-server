import React from 'react'
import { ListItem, ListItemText, Typography } from '@mui/material';

const Comment = ({index, comment, length, commentsRef }) => {
  return (
    <li key={index}>
        <ul>

            <ListItem key={index} ref={length-1 === index ? commentsRef : null}>
                  {/* <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/> */}
                <ListItemText 
                  disableTypography 
                  primary={ <Typography fontSize='0.8rem'> {comment} </Typography>}
                 />
                 {/* {handleDelete ? <Button onClick={handleDelete}><DeleteForever/></Button> : null}
                 <Box sx={{display:'flex', flexDirection:'column'}}>
                      {index===0 ? null : <Button onClick={handleMoveUp}><KeyboardArrowUp/></Button>}
                      {index===length ? null : <Button onClick={handleMoveDown}><KeyboardArrowDown/></Button>}
                 </Box> */}
            </ListItem>
        </ul>
    </li>
  )
}

export default Comment