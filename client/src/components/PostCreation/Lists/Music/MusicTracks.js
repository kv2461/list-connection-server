import React, {useState, useEffect } from 'react';
import { StyledGrid, StyledList, StyledGrid2 } from './styles';
import { Paper, Typography, TextField, Button, Container, Grid, Box} from '@mui/material';
import { Masonry } from '@mui/lab';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import Suggestions from './Suggestions';
import MusicListItem from './MusicListItem';

import { GetMusicTrack } from '../../../../actions/itunes';



const MusicTracks = () => {
    const [trackName, setTrackName] = useState('')
    const [listItems, setListItems] = useState([]); //for list to be saved on db
    const [listItem, setListItem] = useState(0) //for list item to be added on to list
    const [data,setData] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const term = trackName.split(' ').join('+');
        const {results} = await dispatch(GetMusicTrack(term))
        setData(results);
        // console.log(data[0].artistId);
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

    }, [trackName])

    const handleAdd = () => {
        setListItems([...listItems, listItem]);
        setListItem(0);
    }
    

  return (
    <Container>
        <Masonry columns={2} spacing={2}>
            <Box xs={5}>
                <form>
                    <input value={trackName} onChange={(e)=>setTrackName(e.target.value)}></input>
                    <button onClick={()=>handleSearch(trackName)}>search</button>
                    {!listItem ? null : 
                        (<Paper>
                            <Typography>{listItem?.trackName} by {listItem?.artistName}</Typography>
                            <TextField label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                            <Button onClick={handleAdd}><Add /></Button>
                        </Paper>) 
                    }
                </form>
                <Paper>
            {!listItems ? null : 
                <StyledList subheader={<li />}>{
                    listItems.map((item,index) => (
                        <MusicListItem
                            key={`${item?.key}-${index}`}
                            listItem={item}
                            index={index}
                        />))
                    }
                </StyledList>
            }
            </Paper>
            </Box>
        

        <Box xs={6}>
            {data.length ? (
                <StyledGrid container alignItems='stretch'spacing={1}>
                     {data.map((d) => (
                        <Suggestions 
                            key={d?.trackId} 
                            trackName={d?.trackName} 
                            artistName={d?.artistName} 
                            img={d?.artworkUrl100} 
                            handleClick={(e)=>{
                                e.stopPropagation();setListItem({...listItem, key:d?.trackId, trackName:d?.trackName, artistName:d?.artistName, image:d?.artworkUrl100, description:''});setTrackName('');
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

