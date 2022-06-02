import React, {useState, useEffect } from 'react';
import { StyledGrid } from './styles';
import { Paper, Typography, Input } from '@mui/material';
import { useDispatch } from 'react-redux';

import Suggestions from './Suggestions';

import { GetMusicTrack } from '../../../../actions/itunes';



const MusicTracks = () => {
    const [trackName, setTrackName] = useState('')
    const [listItems, setListItems] = useState([]); //for list to be saved on db
    const [listItem, setListItem] = useState({'trackName':'', 'artistName':'', 'description':'', 'image':''}) //for list item to be added on to list
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
    

  return (
    <div>
        <input value={trackName} onChange={(e)=>setTrackName(e.target.value)}></input>
        <button onClick={()=>handleSearch(trackName)}>search</button>
        
        {data.length ? 
        <StyledGrid sx={{m:5}} container alignItems='stretch' spacing={4}>
             {data.map((d)=> (
                <Suggestions 
                    key={d?.trackId} 
                    trackName={d?.trackName} 
                    artistName={d?.artistName} 
                    img={d?.artworkUrl100} 
                    handleClick={(e)=>{
                        e.stopPropagation();setListItem({...listItem, trackName:d?.trackName, artistName:d?.artistName, image:d?.artworkUrl100 })
                    }} 
                />))} 
        </StyledGrid> 
        : null }

        {listItem ? <Paper>
            <Typography>{listItem?.trackName} by {listItem?.artistName}</Typography>
        </Paper> : null}
        

    </div>
  )
}

export default MusicTracks

