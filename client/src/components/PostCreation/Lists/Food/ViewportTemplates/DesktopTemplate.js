import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {Box, FormControl, TextField, Button, Paper, Container, Typography, Collapse, Select, InputLabel, MenuItem } from '@mui/material';
import { StyledGrid, StyledList } from './styles';
import { Add } from '@mui/icons-material';
import { Masonry } from '@mui/lab';


import Form from '../../../../Form/Form';
import FoodListItem from '../FoodListItem';
import Suggestions from '../Suggestions';
import { GetSpoonacularInfo } from '../../../../../actions/foodcentral';

const DesktopTemplate = ({ instructionItem, setInstructionItem, setData, instructionsItems, ingredientItem, setIngredientItem, ingredientName, setIngredientName, ingredientsItems, setListItem, listItem, listItems, listLogic, width, data, handleSearch, readyToSubmit, currentId, setCurrentId, genre, subgenre }) => {
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [label, setLabel] = useState('');
    const [collapseIngredients,setCollapseIngredients] = useState(true);
    const [collapseInstructions, setCollapseInstructions] = useState(true);


    const handleChange = (e) => {
        switch(subgenre) {
            case 'foodRecipe':
                setIngredientName(e.target.value);
                break;
            default:
                break;
        }
    }

    const fetchInfo = async (id) => {

            const item = await dispatch(GetSpoonacularInfo(id))
            setIngredientItem({
                ...ingredientItem, 
                key:`${item?.id}-${Date.now()}`, 
                ingredientName:item?.name, 
                image:`${item?.image !== 'no.jpg' ? `https://spoonacular.com/cdn/ingredients_100x100/${item?.image}` : null}`, 
                comments:'', 
                estimatedCost:item?.estimatedCost, aisle:item?.aisle,
                caloricBreakdown: item?.nutrition?.caloricBreakdown,
                weightPerServing: item?.nutrition?.weightPerServing,
                possibleUnits:item?.possibleUnits,
                amount:0,
                amountUnit:item?.possibleUnits?.[0]
                }
            )

            setIngredientName('');
            setData([])


    }

    const calculateFoodStats = () => {
        const {percentCarbs, percentFat, percentProtein} = ingredientItem?.caloricBreakdown;
        const {amount:weight, unit: weightUnit} = ingredientItem?.weightPerServing;      
        const {value} = ingredientItem?.estimatedCost;
        const dollarValueNumber = Number((value*.01).toFixed(2));
        const dollarValueString = `${(value*.01).toFixed(2)}`;
        const amount = ingredientItem?.amount;
        const amountUnit = ingredientItem?.amountUnit;
        let calculatedAmount = 0;

        switch(amountUnit) {
            case 'steak':
                calculatedAmount = amount*1.3;
            default:
                calculatedAmount = 0;
                
        }

        
  
        console.log(percentCarbs, percentFat, percentProtein, weight, weightUnit, amount, amountUnit, dollarValueNumber,dollarValueString, calculatedAmount)
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
                        <Button onClick={()=>setCollapseIngredients(!collapseIngredients)}> {collapseIngredients ? 'Hide' : 'Show'} </Button>
                        <Collapse in={collapseIngredients} timeout="auto" unmountOnExit>
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
                        </Collapse>
                    </Paper>
                }

                {instructionsItems.length === 0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <Typography sx={{m:1}}>Instructions</Typography>
                        <Button onClick={()=>setCollapseInstructions(!collapseInstructions)}> {collapseInstructions ? 'Hide' : 'Show'} </Button>
                        <Collapse in={collapseInstructions} timeout="auto" unmountOnExit>
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
                        </Collapse>
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
                            <TextField fullWidth label='Comments' value={instructionItem.comments} onChange={e=>setInstructionItem({...instructionItem, comments:e.target.value})}/>
                            <Button variant='contained' onClick={listLogic.handleAddInstruction}>Add to List<Add /></Button>
                            <Button variant='contained' onClick={()=>setInstructionItem(0)}>Cancel</Button>
                        </Paper>)
                    }

                    {instructionItem ? null : 
                    (<Container align='center' sx={{margin:'10px 0'}}>
                        <Button variant='contained' sx={{m:'auto'}}onClick={(e)=>{
                                    e.stopPropagation();setInstructionItem({instruction:'', comments:'' , key:`${Date.now()}`});
                                }}>Add Instruction
                        </Button>
                    </Container>)
                    }
                                


                {!ingredientItem ? null : 
                    (<Paper sx={{p:2}}>
                        {subgenre==='foodRecipe' && 
                            <Typography sx={{m:1}}>
                                {`${ingredientItem?.ingredientName.charAt(0).toUpperCase()}${ingredientItem?.ingredientName.slice(1)}`}
                            </Typography>}
                        <FormControl sx={{flexDirection:'row'}}>
                        <TextField  required defaultValue={0} label='Amount' type='number' onChange={e=>setIngredientItem({...ingredientItem, amount:e.target.valueAsNumber})}/>
                            <Select value={ingredientItem.amountUnit} onChange={e=>setIngredientItem({...ingredientItem, amountUnit:e.target.value})}>
                                {ingredientItem.possibleUnits && ingredientItem.possibleUnits.map((unit,index)=> (<MenuItem key={`select-${index}`} value={unit}>{unit}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <TextField fullWidth label='Comments' onChange={e=>setIngredientItem({...ingredientItem, comments:e.target.value})}/>
                        {/* <Button variant='contained' onClick={listLogic.handleAddIngredient}>Add to List<Add /></Button> */}
                        <Button variant='contained' onClick={calculateFoodStats}>Add to List<Add /></Button>
                        <Button variant='contained' onClick={()=>{setIngredientItem(0);setData([])}}>Cancel</Button>
                    </Paper>) 
                }

                {data.length && subgenre==='foodRecipe' ? (
                    <StyledGrid container alignItems='stretch' spacing={1}>
                         {data.map((d) => (
                            <Suggestions 
                                width={width}
                                subgenre={subgenre}
                                item={d}
                                key={d?.id} 
                                ingredientName={d?.name}
                                image={`${d?.image !== 'no.jpg' ? `https://spoonacular.com/cdn/ingredients_100x100/${d?.image}` : null}`}
                                // handleClick={(e)=>{
                                //     e.stopPropagation();setIngredientItem({...ingredientItem, key:`${d?.id}-${Date.now()}`, ingredientName:d?.name, image:d?.image, comments:''});setIngredientName('');setData([]);
                                // }}
                                fetchInfo={fetchInfo}
                            />))}
                    </StyledGrid> )
                : null }

            </Box>
        </Masonry>
  )
}

export default DesktopTemplate