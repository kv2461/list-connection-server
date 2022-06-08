import React, { useState, useEffect } from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider, Button} from '@mui/material';
import { DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';


const FoodListItem = ({ listItem, index, handleDelete, length, handleMoveUp, handleMoveDown, subgenre, }) => {
  // const [hover, setHover] = useState(false)
  const [name,setName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [brandOwner, setBrandOwner] = useState('');
  const [description, setDescription] = useState('');
  const [measurements, setMeasurements] = useState('');
  const [itemKey, setItemKey] = useState('');

  useEffect(() => {

    switch(subgenre) {
      case 'foodRecipe':
        setName(listItem?.ingredientName);
        setMeasurements(listItem?.measurements);
        setBrandName(listItem?.brandName);
        setBrandOwner(listItem?.brandOwner);
        setItemKey(listItem?.key);
        setDescription(listItem?.description);
        break;
      case 'instructions':
        setName(listItem?.instruction);
        setMeasurements(listItem?.measurements);
        setItemKey(listItem?.key)
        break;
      default:
        break;
    }


  },[subgenre,listItem?.ingredientName,listItem?.instruction])

  return (
    <li key={itemKey}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
            { subgenre === 'foodRecipe' ? 
              <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{
                `${name} 
                ${brandName !== '' ? `-${brandName}` : ''}
                ${brandOwner !== '' ? `from ${brandOwner}` : ''}
                `}
              </ListSubheader>
             : <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name}`}</ListSubheader>
            }

            <ListItem key={itemKey}>
                  {/* <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/> */}
                <ListItemText 
                  disableTypography 
                  primary={ <>
                  {subgenre === 'foodRecipe' &&
                  <Typography fontSize='0.8rem'> 
                    {description ? description : null }
                  </Typography>}
                  {subgenre === 'instructions' &&
                  <Typography fontSize='0.8rem'> 
                    {name}
                  </Typography>}
                  <Typography fontSize='0.8rem'> 
                    {measurements? `${measurements}` : null }
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