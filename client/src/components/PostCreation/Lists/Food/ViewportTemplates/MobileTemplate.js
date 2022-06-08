import React, { useState, useEffect } from 'react'
import {Box, FormControl, TextField, Button, Paper, Container, Typography} from '@mui/material';
import { StyledGrid, StyledList } from './styles';
import { Add } from '@mui/icons-material';


import Form from '../../../../Form/Form';
import FoodListItem from '../FoodListItem';
import Suggestions from '../Suggestions';

const MobileTemplate = ({ ingredientName, setIngredientName, setListItem, listItem, listItems, listLogic, width, data, handleSearch, readyToSubmit, currentId, setCurrentId, genre, subgenre }) => {

    const [name,setName] = useState('');
    const [label, setLabel] = useState('');

    const handleChange = (e) => {
        switch(subgenre) {
            case 'foodRecipe':
                setIngredientName(e.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {

        switch(subgenre) {
          case 'foodRecipe':
            setName(ingredientName);
            setLabel('Search Food Ingredient');
            break;
          default:
            break;
        }
        

    }, [subgenre, ingredientName])


  return (
    <Container>
        <Box justifyContent='center'>
            {!readyToSubmit ? 
                    (<Container sx={{m:'10px'}} align='center'><Button variant='contained' onClick={()=>listLogic.preSubmit()}>Ready to Submit?</Button></Container>) : 
                    (<Container sx={{m:'10px'}} align='center'><Button variant='contained' onClick={()=>listLogic.editSubmit()}>Back to Edit Mode</Button></Container>)
                }

                {readyToSubmit ? null : 
                    (<FormControl fullWidth>
                        <TextField label={label} value={name} variant='outlined' onChange={handleChange}></TextField>
                        <Button variant='contained' onClick={(e)=>{e.stopPropagation();e.preventDefault(e);handleSearch(name)}}>search</Button>
                    </FormControl>) 
                }
            
            </Box>
        

            <Box>

                {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre={genre} subgenre={subgenre}/>}
                {!listItem ? null : 
                    (<Paper sx={{p:2}}>
                        {subgenre==='foodRecipe' && 
                            <Typography sx={{m:1}}>
                                {listItem?.ingredientName} {listItem.brandName !== undefined ? `-${listItem.brandName}` : ''} {listItem.brandOwner !== undefined ? `from ${listItem.brandOwner}` : ''}
                            </Typography>}
                        <TextField fullWidth label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                        <Button variant='contained' onClick={listLogic.handleAdd}>Add to List<Add /></Button>
                    </Paper>) 
                }

                {data.length && subgenre==='foodRecipe' ? (
                    <StyledGrid container alignItems='stretch' spacing={1}>
                         {data.map((d) => (
                            <Suggestions 
                                width={width}
                                subgenre={subgenre}
                                key={d?.fdcId} 
                                ingredientName={d?.description}
                                brandName={d?.brandName} 
                                brandOwner={d?.brandOwner} 
                                handleClick={(e)=>{
                                    e.stopPropagation();setListItem({...listItem, key:d?.fdcId, ingredientName:d?.description, brandName:d?.brandName, brandOwner:d?.brandOwner , description:''});setIngredientName('');
                                }}
                            />))}
                    </StyledGrid> )
                : null }

              
                {listItems.length===0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <StyledList subheader={<li />}>{
                            listItems.map((item,index) => (
                                <FoodListItem
                                    key={`${item?.key}-${index}`}
                                    listItem={item}
                                    index={index}
                                    handleDelete={()=>listLogic.handleDelete(item)}
                                    length={listItems.length - 1}
                                    handleMoveUp = {()=>listLogic.handleMoveUp(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDown(item)}
                                    subgenre={subgenre}
                                />))
                            } 
                        </StyledList>
                    </Paper>
                }


            </Box>
        </Container>
  )
}

export default MobileTemplate