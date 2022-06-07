import React, { useState, useEffect } from 'react'
import { MusicNote, MovieFilter, MiscellaneousServices } from '@mui/icons-material'
import { ArtTrack, Album, InterpreterMode, } from '@mui/icons-material'
import { StyledSvgIcon } from './styles';

const GenreIcon = ({genre, subgenre}) => {
    const [genreIcon, setGenreIcon] = useState();
  
  useEffect(() => {
    if (genre) {
        switch(genre) {
          case 'music':
            setGenreIcon(MusicNote);
            break;
          case 'movie':
            setGenreIcon(MovieFilter);
            break;
          default:
            setGenreIcon(MiscellaneousServices);
            break;
        }
    }

    if (subgenre) {
        switch(subgenre) {
          case 'musicTracks':
            setGenreIcon(ArtTrack);
            break;
          case 'musicAlbums':
            setGenreIcon(Album);
            break;
          case 'musicArtists':
            setGenreIcon(InterpreterMode);
            break;
          default:
            setGenreIcon(MiscellaneousServices);
            break;
        }
    }


  }, [genre,subgenre])
  return (
    <StyledSvgIcon component={genreIcon}/>
  )
}

export default GenreIcon