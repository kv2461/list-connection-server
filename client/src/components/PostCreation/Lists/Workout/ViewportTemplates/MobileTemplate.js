import React, { useState, useEffect } from 'react'
import {Box, FormControl, TextField, Button, Paper, Container, Typography} from '@mui/material';
import { StyledGrid, StyledList } from './styles';
import { Add } from '@mui/icons-material';

import Form from '../../../../Form/Form';
import WorkoutListItem from '../WorkoutListItems';
import Suggestions from '../Suggestions';
const MobileTemplate = ({setWorkoutName, workoutName, setListItem, listItem, listItems, listLogic, setData,  data, handleSearch, readyToSubmit, currentId, setCurrentId, genre, subgenre}) => {

    const [name,setName] = useState('');
    const [label, setLabel] = useState('');

    const handleChange = (e) => {
        switch(subgenre) {
            case 'workout':
                setWorkoutName(e.target.value);
                break;
            default:
                setWorkoutName(e.target.value);
                break;
        }
    }

   
    useEffect(() => {

        switch(subgenre) {
          case 'workout':
            setName(workoutName);
            setLabel('Search Workout');
            break;
          default:
            setName(workoutName);
            setLabel('Search Workout');
            break;
        }
        

    },[subgenre, workoutName])



  return (
    <Container>
        <Box justifyContent='center'>
            {!readyToSubmit ? 
                    (<Container sx={{m:'10px'}} align='center'><Button variant='contained' onClick={()=>listLogic.preSubmit()}>Ready to Submit?</Button></Container>) : 
                    (<Container sx={{m:'10px'}} align='center'><Button variant='contained' onClick={()=>listLogic.editSubmit()}>Back to Edit Mode</Button></Container>)
                }

                {readyToSubmit ? null : 
                    (<FormControl fullWidth>
                        <TextField label={label }value={name} variant='outlined' onChange={handleChange}></TextField>
                        <Button variant='contained' onClick={(e)=>{e.stopPropagation();e.preventDefault(e);handleSearch(name)}}>search</Button>
                    </FormControl>) 
                }
            
            </Box>
        

            <Box>

            {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre={genre} subgenre={subgenre}/>}
                {!listItem ? null : 
                    (<Paper sx={{p:2}}>
                        {subgenre==='workout' && <Typography sx={{m:1}}>{listItem.workoutName}</Typography>}
                        <TextField fullWidth label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                        <Button variant='contained' onClick={listLogic.handleAdd}>Add to List<Add /></Button>
                    </Paper>) 
                }

            {data.length !== undefined && subgenre==='workout' ? (
                    <StyledGrid container alignItems='stretch'spacing={1}>
                         {data.map((d,index) => (
                            <Suggestions 
                                index={index}
                                workoutName={d.data.name}
                                image={d.data.image ? `https://wger.de/${d?.data?.image}` : ''}
                                subgenre={genre}
                                key={d?.data?.id} 
                                category={d?.data?.category}
                                handleClick={(e)=>{
                                    e.stopPropagation();setListItem({...listItem, key:d?.data?.id, category: d?.data.category, workoutName:d?.data?.name, image:d?.data?.image, comments:''});setWorkoutName('');setData([]);
                                }}
                            />))}
                    </StyledGrid> )
                : null }

              
               
                {listItems.length===0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <StyledList subheader={<li />}>{
                            listItems.map((item,index) => (
                                <WorkoutListItem
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