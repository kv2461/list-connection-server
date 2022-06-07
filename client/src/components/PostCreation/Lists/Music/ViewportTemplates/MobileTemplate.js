import React, { useState, useEffect } from 'react'
import {Box, FormControl, TextField, Button, Paper, Container, Typography} from '@mui/material';
import { StyledGrid, StyledList } from './styles';
import { Add } from '@mui/icons-material';


import Form from '../../../../Form/Form';
import MusicListItem from '../MusicListItem';
import Suggestions from '../Suggestions';

const MobileTemplate = ({setTrackName, setAlbumName, albumName, setListItem, listItem, trackName, listItems, listLogic, width, data, handleSearch, readyToSubmit, currentId, setCurrentId, genre, subgenre }) => {

    const [name,setName] = useState('');
    const [label, setLabel] = useState('');

    const handleChange = (e) => {
        switch(subgenre) {
            case 'musicTracks':
                setTrackName(e.target.value);
                break;
            case 'musicAlbums':
                setAlbumName(e.target.value);
                break;
            default:
                setTrackName(e.target.value);
                break;
        }
    }

        useEffect(() => {

            switch(subgenre) {
              case 'musicTracks':
                setName(trackName);
                setLabel('Search Music Track/Artist');
                break;
              case 'musicAlbums':
                setName(albumName);
                setLabel('Search Music Album/Artist');
                break;
              default:
                setName(trackName);
                break;
            }
            

        },[albumName,subgenre,trackName])


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

                {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre='music' subgenre='musicTracks'/>}
                {!listItem ? null : 
                    (<Paper sx={{p:2}}>
                        {subgenre==='musicTracks' && <Typography sx={{m:1}}>{listItem?.trackName} by {listItem?.artistName}</Typography>}
                        {subgenre==='musicAlbums' && <Typography sx={{m:1}}>{listItem?.albumName} by {listItem?.artistName}</Typography>}
                        <TextField fullWidth label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                        <Button variant='contained' onClick={listLogic.handleAdd}> Add to List<Add /></Button>
                    </Paper>) 
                }

                {data.length && subgenre==='musicTracks' ? (
                    <StyledGrid container alignItems='stretch'spacing={1}>
                         {data.map((d) => (
                            <Suggestions 
                                width={width}
                                subgenre={subgenre}
                                key={d?.trackId || d?.collectionId} 
                                albumName={d?.collectionName}
                                trackName={d?.trackName} 
                                artistName={d?.artistName} 
                                img={d?.artworkUrl100}
                                handleClick={(e)=>{
                                    e.stopPropagation();setListItem({...listItem, key:d?.trackId, trackName:d?.trackName, artistName:d?.artistName, image:d?.artworkUrl100, description:'', thumbnail:d?.artworkUrl60});setTrackName('');
                                }}
                            />))}
                    </StyledGrid> )
                : null }

                {data.length && subgenre==='musicAlbums'? (
                    <StyledGrid container alignItems='stretch'spacing={1}>
                         {data.map((d) => (
                            <Suggestions 
                                width={width}
                                subgenre={subgenre}
                                key={d?.trackId || d?.collectionId} 
                                albumName={d?.collectionName}
                                trackName={d?.trackName} 
                                artistName={d?.artistName} 
                                img={d?.artworkUrl100}
                                handleClick={(e)=>{
                                    e.stopPropagation();setListItem({...listItem, key:d?.collectionId, albumName:d?.collectionName, artistName:d?.artistName, image:d?.artworkUrl100, description:'', thumbnail:d?.artworkUrl60});setAlbumName('');
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