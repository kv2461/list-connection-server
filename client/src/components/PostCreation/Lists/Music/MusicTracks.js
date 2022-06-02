import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GetMusicTrack } from '../../../../actions/itunes';


const MusicTracks = () => {
    const [trackName, setTrackName] = useState('')
    const [data,setData] = useState([]);
    const dispatch = useDispatch();

    const handleSearch = (trackName) => {
        const term = trackName.split(' ').join('+');
        dispatch(GetMusicTrack(term));
    }

    useEffect(() => {
      if (trackName.length>0) {
        const term = trackName.split(' ').join('+');
        const fetchData = async () => {
            const {results} = await dispatch(GetMusicTrack(term))
            setData(results);
            // console.log(data[0].artistId);
        }

        fetchData()

        .catch(console.error);
      };

    }, [trackName])
    

  return (
    <div>
        <p>{data[0]?.trackName}</p>
        <p>{data[0]?.artistName}</p>
        <img src={data[0]?.artworkUrl100}/>
        <input value={trackName} onChange={(e)=>setTrackName(e.target.value)}></input>
        <button onClick={()=>handleSearch(trackName)}>search</button>

    </div>
  )
}

export default MusicTracks

// https://itunes.apple.com/search?term=jack+johnson&entity=musicTrack
