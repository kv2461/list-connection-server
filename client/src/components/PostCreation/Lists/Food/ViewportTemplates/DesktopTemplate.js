import React, { useState, useEffect } from 'react'
import {Box, FormControl, TextField, Button, Paper, Container, Typography} from '@mui/material';
import { StyledGrid, StyledList } from './styles';
import { Add } from '@mui/icons-material';
import { Masonry } from '@mui/lab';


import Form from '../../../../Form/Form';
import FoodListItem from '../FoodListItem';
import Suggestions from '../Suggestions';

const DesktopTemplate = ({ instructionItem, setInstructionItem, setData, instructionsItems, ingredientItem, setIngredientItem, ingredientName, setIngredientName, ingredientsItems, setListItem, listItem, listItems, listLogic, width, data, handleSearch, readyToSubmit, currentId, setCurrentId, genre, subgenre }) => {
    
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
    <Masonry columns={2} spacing={1}>
            <Box justifyContent='center'>

                {readyToSubmit ? null : 
                    (<FormControl fullWidth>
                        <TextField label={label} value={name} variant='outlined' onChange={handleChange}></TextField>
                        <Button variant='contained' onClick={(e)=>{e.stopPropagation();e.preventDefault(e);handleSearch(name)}}>search</Button>
                    </FormControl>) 
                }


                {ingredientsItems.length===0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <Typography sx={{m:1}}>Ingredients</Typography>
                        <StyledList subheader={<li />}>{
                            ingredientsItems.map((item,index) => (
                                <FoodListItem
                                    key={item?.key}
                                    listItem={item}
                                    index={index}
                                    handleDelete={()=>listLogic.handleDeleteIngredient(item)}
                                    length={ingredientsItems.length - 1}
                                    handleMoveUp = {()=>listLogic.handleMoveUpIngredient(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDownIngredient(item)}
                                    subgenre={subgenre}
                                />))
                            } 
                        </StyledList>
                    </Paper>
                }

                {instructionsItems.length === 0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <Typography sx={{m:1}}>Instructions</Typography>
                        <StyledList subheader={<li />}>{
                            instructionsItems.map((item,index) => (
                                <FoodListItem
                                    key={`${item?.key}10001`}
                                    listItem={item}
                                    index={index}
                                    handleDelete={()=>listLogic.handleDeleteInstructions(item)}
                                    length={instructionsItems.length - 1}
                                    handleMoveUp = {()=>listLogic.handleMoveUpInstructions(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDownInstructions(item)}
                                    subgenre='instructions'
                                />))
                            } 

                        </StyledList>
                    </Paper>
                }
                
            
            </Box>
        

            <Box>
                
                {!readyToSubmit ? 
                    (<Container align='center'><Button variant='contained' onClick={()=>listLogic.preSubmit()}>Ready to Submit?</Button></Container>) : 
                    (<Container align='center'><Button variant='contained' onClick={()=>listLogic.editSubmit()}>Back to Edit Mode</Button></Container>)
                }

                {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre={genre} subgenre={subgenre}/>}
                

                    {!instructionItem ? null : 
                        (<Paper sx={{p:2}}>
                            {subgenre==='foodRecipe' && 
                                <Typography sx={{m:1}}>Add A Recipe Step</Typography>}
                            <TextField fullWidth label='Instruction' value={instructionItem.instruction} onChange={e=>setInstructionItem({...instructionItem, instruction:e.target.value})}/>
                            <TextField fullWidth label='Measurements' value={instructionItem.measurements} onChange={e=>setInstructionItem({...instructionItem, measurements:e.target.value})}/>
                            <Button variant='contained' onClick={listLogic.handleAddInstruction}>Add to List<Add /></Button>
                            <Button variant='contained' onClick={()=>setInstructionItem(0)}>Cancel</Button>
                        </Paper>)
                    }

                    {instructionItem ? null : 
                    (<Container align='center' sx={{margin:'10px 0'}}>
                        <Button variant='contained' sx={{m:'auto'}}onClick={(e)=>{
                                    e.stopPropagation();setInstructionItem({instruction:'', measurements:'', key:`${Date.now()}`});
                                }}>Add Instruction
                        </Button>
                    </Container>)
                    }
                                


                {!ingredientItem ? null : 
                    (<Paper sx={{p:2}}>
                        {subgenre==='foodRecipe' && 
                            <Typography sx={{m:1}}>
                                {ingredientItem?.ingredientName} {ingredientItem.brandName !== undefined ? `-${ingredientItem.brandName}` : ''} {ingredientItem.brandOwner !== undefined ? `from ${ingredientItem.brandOwner}` : ''}
                            </Typography>}
                        <TextField fullWidth label='Description' onChange={e=>setIngredientItem({...ingredientItem, description:e.target.value})}/>
                        <TextField fullWidth label='Measurements' onChange={e=>setIngredientItem({...ingredientItem, measurements:e.target.value})}/>
                        <Button variant='contained' onClick={listLogic.handleAddIngredient}>Add to List<Add /></Button>
                        <Button variant='contained' onClick={()=>{setIngredientItem(0);setData([])}}>Cancel</Button>
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
                                    e.stopPropagation();setIngredientItem({...ingredientItem, key:`${d?.fdcId}-${Date.now()}`, ingredientName:d?.description, brandName:d?.brandName, brandOwner:d?.brandOwner , description:''});setIngredientName('');setData([]);
                                }}
                            />))}
                    </StyledGrid> )
                : null }

            </Box>
        </Masonry>
  )
}

export default DesktopTemplate