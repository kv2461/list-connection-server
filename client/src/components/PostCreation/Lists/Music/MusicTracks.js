import React, {useState, useEffect } from 'react';
import { StyledGrid, StyledList, } from './styles';
import { Paper, Typography, TextField, Button, Container, Box, FormControl } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import Suggestions from './Suggestions';
import MusicListItem from './MusicListItem';
import Form from '../../../Form/Form';

import { GetMusicTrack } from '../../../../actions/itunes';



const MusicTracks = ({currentId,setCurrentId}) => {
    const [trackName, setTrackName] = useState('')
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [listItems, setListItems] = useState([]); //for list to be saved on db
    const [listItem, setListItem] = useState(0) //for list item to be added on to list
    const [data,setData] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const term = trackName.split(' ').join('+');
        const {results} = await dispatch(GetMusicTrack(term))
        setData(results);
    }

    const handleSearch = (trackName) => {
        fetchData()
        .catch(console.error);
    }

    useEffect(() => {
      if (trackName.length%7===0 || trackName.length === 5) {

        fetchData() 

        .catch(console.error);
      };
      
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackName]) 

    const handleAdd = () => {
        setListItems([...listItems, listItem]);
        setListItem(0);
    }

    const handleDelete = (item) => {
        setListItems(listItems.filter(i => i !== item))
    }

    const changeValuePosition = (arr,init,target) => {
        [arr[init], arr[target]] = [arr[target],arr[init]];
        return arr;
    }

    const handleMoveUp = (item) => {
        let index = 0;
        const updatedList = listItems.map((x,i) => {
            if(x.key === item.key) {
                index = i;
            }
            return x;
        });
        changeValuePosition(updatedList,index,index-1);

        setListItems(updatedList);
    }
    
    const handleMoveDown = (item) => {
        let index = 0;
        const updatedList = listItems.map((x,i) => {
            if(x.key === item.key) {
                index = i;
            }
            return x;
        });
        changeValuePosition(updatedList,index,index+1);

        setListItems(updatedList);
    }

    const preSubmit = () => {
        if (listItems.length>0){
            setReadyToSubmit(true);
            setTrackName('');
        }
    }

    const editSubmit = () => {
        setReadyToSubmit(false);
    }
    

  return (
    <Container>
        <Masonry columns={2} spacing={1}>
            <Box justifyContent='center'>

                {readyToSubmit ? null : 
                    (<FormControl fullWidth>
                        <TextField label='Track Name/Artist'value={trackName} variant='outlined' onChange={(e)=>setTrackName(e.target.value)}></TextField>
                        <Button onClick={(e)=>{e.stopPropagation();e.preventDefault(e);handleSearch(trackName)}}>search</Button>
                    </FormControl>) 
                }

            {listItems.length===0 ? null : 
                <Paper sx={{marginTop:5}}>
                    <StyledList subheader={<li />}>{
                        listItems.map((item,index) => (
                            <MusicListItem
                                key={`${item?.key}-${index}`}
                                listItem={item}
                                index={index}
                                handleDelete={()=>handleDelete(item)}
                                length={listItems.length - 1}
                                handleMoveUp = {()=>handleMoveUp(item)}
                                handleMoveDown = {()=>handleMoveDown(item)}
                            />))
                        } 
                    </StyledList>
                </Paper>
            }
            
            </Box>
        

        <Box>
            {!readyToSubmit ? 
                (<Button onClick={()=>preSubmit()}>Ready to Submit?</Button>) : 
                (<Button onClick={()=>editSubmit()}>Back to Edit Mode</Button>)
            }

            {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre='music' subgenre='musicTrack'/>}
            {!listItem ? null : 
                (<Paper sx={{p:2}}>
                    <Typography sx={{m:1}}>{listItem?.trackName} by {listItem?.artistName}</Typography>
                    <TextField fullWidth label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                    <Button onClick={handleAdd}>Add to List<Add /></Button>
                </Paper>) 
            }
            {data.length ? (
                <StyledGrid container alignItems='stretch'spacing={1}>
                     {data.map((d) => (
                        <Suggestions 
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
            </Box>
        </Masonry>

    </Container>
  )
}

export default MusicTracks

