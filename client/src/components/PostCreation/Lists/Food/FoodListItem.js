import React, { useState, useEffect } from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider, Button, Collapse} from '@mui/material';
import { DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';


const FoodListItem = ({ listItem, index, handleDelete, length, handleMoveUp, handleMoveDown, subgenre, }) => {
  // const [hover, setHover] = useState(false)
  const [name,setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [itemKey, setItemKey] = useState('');
  const [collapseStats,setCollapseStats] = useState(false)

  useEffect(() => {

    switch(subgenre) {
      case 'foodRecipe':
        setName(listItem?.ingredientName);
        setImage(listItem?.image);
        setItemKey(listItem?.key);
        setDescription(listItem?.comments);
        break;
      case 'instructions':
        setName(listItem?.instruction);
        setItemKey(listItem?.key)
        setDescription(listItem?.comments)
        break;
      default:
        break;
    }


  },[subgenre,listItem])

  return (
    <li key={itemKey}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
            { subgenre === 'foodRecipe' ? 
              <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</ListSubheader>
             : <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{index + 1} - {name}</ListSubheader>
            }

            <ListItem key={itemKey}>
              {subgenre === 'foodRecipe' && image !== null && (<Box component='img' sx={{m:1,p:1, maxHeight:'40px', maxWidth:'40px'}} src={image}/>)}
                <ListItemText 
                  disableTypography 
                  primary={ <>
                  <Typography fontSize='0.8rem'> 
                    {description ? description : null }
                  </Typography>

                  {subgenre === 'foodRecipe' && <Typography fontSize='0.8rem'> 
                    {listItem.amount > 0 ? `${listItem.amount} ${listItem.amountUnit}` : null }
                  </Typography>
                  }

                  {listItem.calculable && 
                    <><Button onClick={()=>setCollapseStats(!collapseStats)} > {collapseStats ? 'Hide' : 'Show'} </Button>
                    <Collapse in={collapseStats} timeout="auto" unmountOnExit>
                        <Typography fontSize='0.7rem' sx={{color:'text.secondary'}}>Fat per serving: {listItem.fatPerServing}g</Typography>
                        <Typography fontSize='0.7rem' sx={{color:'text.secondary'}}>Carbohydrates per serving: {listItem.carbsPerServing}g</Typography>
                        <Typography fontSize='0.7rem' sx={{color:'text.secondary'}}>Protein per serving: {listItem.proteinPerServing}g</Typography>
                        <Typography fontSize='0.7rem' sx={{color:'text.secondary'}}>Calories per serving: {listItem.caloriesPerServing}kcal</Typography>
                        <Typography fontSize='0.7rem' sx={{color:'text.secondary'}}>Grams per serving: {listItem.gramsPerServing} g</Typography>
                    </Collapse></>
                  }

                  </>
                  }

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