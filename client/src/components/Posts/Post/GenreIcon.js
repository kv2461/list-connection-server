import React, { useState, useEffect } from 'react'
import { ButtonBase } from '@mui/material'
import { MusicNote, MovieFilter, MiscellaneousServices, EggAlt, MenuBook } from '@mui/icons-material'
import { ArtTrack, Album, InterpreterMode, } from '@mui/icons-material'
import { StyledSvgIcon } from './styles';
import { useNavigate } from 'react-router-dom';

const GenreIcon = ({ genre, subgenre }) => {
    const [genreIcon, setGenreIcon] = useState();
    const navigate = useNavigate();
  
  useEffect(() => {
    if (genre) {
        switch(genre) {
          case 'music':
            setGenreIcon(MusicNote);
            break;
          case 'movie':
            setGenreIcon(MovieFilter);
            break;
          case 'food':
            setGenreIcon(EggAlt);
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
          case 'foodRecipe':
            setGenreIcon(MenuBook)
            break;
          default:
            setGenreIcon(MiscellaneousServices);
            break;
        }
    }


  }, [genre,subgenre])
  return (
    <ButtonBase onClick={ ()=>navigate(`?subgenrename=${subgenre ? subgenre : ''}&genrename=${genre ? genre : ''}`)}>
      <StyledSvgIcon component={genreIcon} />
    </ButtonBase>
  )
}

export default GenreIcon