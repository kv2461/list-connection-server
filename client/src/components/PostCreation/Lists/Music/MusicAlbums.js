import React, {useState, useEffect } from 'react';
import { StyledGrid, StyledList, } from './styles';
import { Paper, Typography, TextField, Button, Container, Box, FormControl } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import Suggestions from './Suggestions';
import MusicListItem from './MusicListItem';
import Form from '../../../Form/Form';


import { GetMusicAlbum } from '../../../../actions/itunes'; 



const MusicAlbums = ({currentId,setCurrentId}) => {
    const [albumName, setAlbumName] = useState('')
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [listItems, setListItems] = useState([]); //for list to be saved on db
    const [listItem, setListItem] = useState(0) //for list item to be added on to list
    const [data,setData] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const term = albumName.split(' ').join('+');
        const {results} = await dispatch(GetMusicAlbum(term))
        setData(results);
    }

    const handleSearch = () => {
        fetchData()
        .catch(console.error);
    }

    useEffect(() => {
      if (albumName.length%7===0 || albumName.length === 5) {

        fetchData() 

        .catch(console.error);
      };
      
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [albumName]) 

    const listLogic = {
        handleAdd: () => {
            setListItems([...listItems, listItem]);
            setListItem(0);
        },
        handleDelete: (item) => {
            setListItems(listItems.filter(i => i !== item))
        },
        changeValuePosition: (arr,init,target) => {
            [arr[init], arr[target]] = [arr[target],arr[init]];
            return arr;
        },
        handleMoveUp: (item) => {
            let index = 0;
            const updatedList = listItems.map((x,i) => {
                if(x.key === item.key) {
                    index = i;
                }
                return x;
            });
            listLogic.changeValuePosition(updatedList,index,index-1);
        
            setListItems(updatedList);
        },
        handleMoveDown: (item) => {
            let index = 0;
            const updatedList = listItems.map((x,i) => {
                if(x.key === item.key) {
                    index = i;
                }
                return x;
            });
            listLogic.changeValuePosition(updatedList,index,index+1);
        
            setListItems(updatedList);
        },
    
        preSubmit: () => {
                if (listItems.length>0){
                    setReadyToSubmit(true);
                    setAlbumName('');
                }
        },
    
        editSubmit: () => {
            setReadyToSubmit(false);
        }
    
    }
    
    
    

  return (
    <Container>
        
        <Masonry columns={2} spacing={1}>
            <Box justifyContent='center'>

                {readyToSubmit ? null : 
                    (<FormControl fullWidth>
                        <TextField label='Album Name/Artist'value={albumName} variant='outlined' onChange={(e)=>setAlbumName(e.target.value)}></TextField>
                        <Button onClick={(e)=>{e.stopPropagation();e.preventDefault(e);handleSearch(albumName)}}>search</Button>
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
                                    handleDelete={()=>listLogic.handleDelete(item)}
                                    length={listItems.length - 1}
                                    handleMoveUp = {()=>listLogic.handleMoveUp(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDown(item)}
                                    genre='musicAlbums'
                                />))
                            } 
                        </StyledList>
                    </Paper>
                }
            
            </Box>
        

            <Box>

                {!readyToSubmit ? 
                    (<Button onClick={()=>listLogic.preSubmit()}>Ready to Submit?</Button>) : 
                    (<Button onClick={()=>listLogic.editSubmit()}>Back to Edit Mode</Button>)
                }

                {!readyToSubmit ? null : <Form currentId={currentId} setCurrentId={setCurrentId} list={listItems} genre='music' subgenre='musicAlbums'/>}
                {!listItem ? null : 
                    (<Paper sx={{p:2}}>
                        <Typography sx={{m:1}}>{listItem?.albumName} by {listItem?.artistName}</Typography>
                        <TextField fullWidth label='Description' onChange={e=>setListItem({...listItem, description:e.target.value})}/>
                        <Button onClick={listLogic.handleAdd}>Add to List<Add /></Button>
                    </Paper>) 
                }

                {data.length ? (
                    <StyledGrid container alignItems='stretch'spacing={1}>
                         {data.map((d) => (
                            <Suggestions 
                                genre='musicAlbums'
                                key={d?.collectionId} 
                                albumName={d?.collectionName} 
                                artistName={d?.artistName} 
                                img={d?.artworkUrl100}
                                handleClick={(e)=>{
                                    e.stopPropagation();setListItem({...listItem, key:d?.collectionId, albumName:d?.collectionName, artistName:d?.artistName, image:d?.artworkUrl100, description:'', thumbnail:d?.artworkUrl60});setAlbumName('');
                                }} 
                            />))}
                    </StyledGrid> )
                : null }


            </Box>
        </Masonry>

    </Container>
  )
}

export default MusicAlbums