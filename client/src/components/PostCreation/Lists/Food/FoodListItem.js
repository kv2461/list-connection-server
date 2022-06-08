import React, { useState, useEffect } from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider, Button} from '@mui/material';
import { DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';


const FoodListItem = ({ listItem, index, handleDelete, length, handleMoveUp, handleMoveDown, subgenre }) => {
  // const [hover, setHover] = useState(false)
  const [name,setName] = useState('');

  useEffect(() => {

    switch(subgenre) {
      case 'foodRecipe':
        setName(listItem?.ingredientName);
        break;
      case 'instructions':
        setName(listItem?.instruction);
        break;
      default:
        break;
    }


  },[subgenre,listItem?.ingredientName,listItem?.instruction])

  return (
    <li key={listItem?.key}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
            { subgenre === 'foodRecipe' ? 
              <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{
                `${name} 
                ${listItem.brandName !== undefined ? `-${listItem.brandName}` : ''}
                ${listItem.brandOwner !== undefined ? `from ${listItem.brandOwner}` : ''}
                `}
              </ListSubheader>
             : <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name}`}</ListSubheader>
            }

            <ListItem key={`${listItem?.key}-${index}`}>
                  {/* <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/> */}
                <ListItemText 
                  disableTypography 
                  primary={ <>
                  <Typography fontSize='0.8rem'> 
                    {listItem.description ? `${listItem?.description}` : null }
                  </Typography>
                  <Typography fontSize='0.8rem'> 
                    {listItem.measurements? `${listItem?.measurements}` : null }
                  </Typography>
                  </>}
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

export default FoodListItem