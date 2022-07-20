import React, { useState, useEffect } from 'react'
import {Box, FormControl, TextField, Button, Paper, Container, Typography } from '@mui/material';
import { StyledGrid, StyledList } from './styles';
import { Add } from '@mui/icons-material';
import { Masonry } from '@mui/lab';


import Form from '../../../../Form/Form';
import YogaListItem from '../YogaListItems';
import Suggestions from '../Suggestions';
// import { StyledAvatar } from '../../../../Navbar/styles';

const DesktopTemplate = ({ setYogaPoseName, yogaPoseName, setListItem, listItem, listItems, listLogic, setData, data, handleSearch, readyToSubmit, currentId, setCurrentId, genre, subgenre }) => {

    const [name,setName] = useState('');
    const [label, setLabel] = useState('');

    const handleChange = (e) => {
        switch(subgenre) {
            case 'yoga':
                setYogaPoseName(e.target.value);
                break;
            default:
                setYogaPoseName(e.target.value);
                break;
        }
    }

        useEffect(() => {

            switch(subgenre) {
              case 'yoga':
                setName(yogaPoseName);
                setLabel('Search Yoga Pose');
                break;
              default:
                setName(yogaPoseName);
                setLabel('Search Yoga Pose');
                break;
            }
            

        },[subgenre, yogaPoseName])


  return (
    <Masonry columns={2} spacing={1}>
            <Box justifyContent='center'>

                {readyToSubmit ? null : 
                    (<FormControl fullWidth>
                        <TextField label={label} value={name} variant='outlined' onChange={handleChange}></TextField>
                        <Button variant='contained' onClick={(e)=>{e.stopPropagation();e.preventDefault(e);handleSearch(name)}}>search</Button>
                    </FormControl>) 
                }

                
                {listItems.length===0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <StyledList subheader={<li />}>{
                            listItems.map((item,index) => (
                                <YogaListItem
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
        

            <Box>
                
                {!readyToSubmit ? 
                    (<Container align='center'><Button variant='contained' onClick={()=>listLogic.preSubmit()}>Ready to Submit?</Button></Container>) : 
                    (<Container align='center'><Button variant='contained' onClick={()=>listLogic.editSubmit()}>Back to Edit Mode</Button></Container>)
                }

                {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre={genre} subgenre={subgenre}/>}
                {!listItem ? null : 
                    (<Paper sx={{p:2}}>
                        {subgenre==='yoga' && <Typography sx={{m:1}}>{listItem?.yogaPoseName}</Typography>}
                        <TextField fullWidth label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                        <Button variant='contained' onClick={listLogic.handleAdd}>Add to List<Add /></Button>
                    </Paper>) 
                }

                {data.length !== undefined && subgenre==='yoga' ? (
                    <StyledGrid container alignItems='stretch'spacing={1}>
                         {data.map((d,index) => (
                            <Suggestions 
                                index={index}
                                yogaPoseName={d.name}
                                image={d.imageSrc}
                                subgenre={genre}
                                key={d._id} 
                                sanskrit={d.sanskrit}
                                handleClick={(e)=>{
                                    e.stopPropagation();setListItem({...listItem, key:d?._id, yogaPoseName:d?.name, image:d?.imageSrc, sanskrit:d?.sanskrit});setYogaPoseName('');setData([]);
                                }}
                            />))}
                    </StyledGrid> )
                : null }

            </Box>
        </Masonry>
  )
}

export default DesktopTemplate