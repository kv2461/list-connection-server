import React from 'react'
import {Box, FormControl, TextField, Button, Paper, Container, Typography} from '@mui/material';
import { StyledGrid, StyledList } from './styles';
import { Add } from '@mui/icons-material';


import Form from '../../../../Form/Form';
import MusicListItem from '../MusicListItem';
import Suggestions from '../Suggestions';

const MobileTemplate = ({setTrackName, setListItem, listItem, trackName, listItems, listLogic, width, data, handleSearch, readyToSubmit, currentId, setCurrentId}) => {
  return (
    <Container>
        <Box justifyContent='center'>
            {!readyToSubmit ? 
                    (<Container sx={{m:'10px'}} align='center'><Button variant='contained' onClick={()=>listLogic.preSubmit()}>Ready to Submit?</Button></Container>) : 
                    (<Container sx={{m:'10px'}} align='center'><Button variant='contained' onClick={()=>listLogic.editSubmit()}>Back to Edit Mode</Button></Container>)
                }

                {readyToSubmit ? null : 
                    (<FormControl fullWidth>
                        <TextField label='Track Name/Artist'value={trackName} variant='outlined' onChange={(e)=>setTrackName(e.target.value)}></TextField>
                        <Button variant='contained' onClick={(e)=>{e.stopPropagation();e.preventDefault(e);handleSearch(trackName)}}>search</Button>
                    </FormControl>) 
                }
            
            </Box>
        

            <Box>

                {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre='music' subgenre='musicTracks'/>}
                {!listItem ? null : 
                    (<Paper sx={{p:2}}>
                        <Typography sx={{m:1}}>{listItem?.trackName} by {listItem?.artistName}</Typography>
                        <TextField fullWidth label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                        <Button variant='contained' onClick={listLogic.handleAdd}> Add to List<Add /></Button>
                    </Paper>) 
                }

                {data.length ? (
                    <StyledGrid container alignItems='stretch'spacing={1}>
                         {data.map((d) => (
                            <Suggestions 
                                width={width}
                                genre='musicTracks'
                                key={d?.trackId} 
                                trackName={d?.trackName} 
                                artistName={d?.artistName} 
                                img={d?.artworkUrl100}
                                handleClick={(e)=>{
                                    e.stopPropagation();setListItem({...listItem, key:d?.trackId, trackName:d?.trackName, artistName:d?.artistName, image:d?.artworkUrl100, description:'', thumbnail:d?.artworkUrl60});setTrackName('');
                                }} 
                            />))}
                    </StyledGrid> )
                : null }

              
                {listItems.length===0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <StyledList subheader={<li />}>{
                            listItems.map((item,index) => (
                                <MusicListItem
                                    key={`${item?.key}-${index}`}
                                    listItem={item}
                                    index={index}
                                    handleDelete={()=>listLogic.handleDelete(item)}
                                    length={listItems.length - 1}
                                    handleMoveUp = {()=>listLogic.handleMoveUp(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDown(item)}
                                    genre='musicTracks'
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