import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { GetMusicTrack } from '../../../../actions/itunes';


const MusicTracks = () => {
    const [trackName, setTrackName] = useState('')
    const dispatch = useDispatch();

    const handleSearch = (trackName) => {
        const term = trackName.split(' ').join('+');
        dispatch(GetMusicTrack(term));
    }

  return (
    <div>
        <p>{trackName.split(' ').join('+')}</p>
        <input value={trackName} onChange={(e)=>setTrackName(e.target.value)}></input>
        <button onClick={()=>handleSearch(trackName)}>search</button>

    </div>
  )
}

export default MusicTracks

// https://itunes.apple.com/search?term=jack+johnson&entity=musicTrack
