import React, { useState, useEffect } from 'react'
import {Paper, Button, Collapse, Typography} from '@mui/material';
import {StyledList} from './styles';
import MusicListItem from '../../PostCreation/Lists/Music/MusicListItem';
import FoodListItem from '../../PostCreation/Lists/Food/FoodListItem';

const ListDetails = ({post,list}) => {
    const [listItems, setListItems] = useState([]);
    const [listItems2, setListItems2] = useState([]);
    const [collapseInstructions, setCollapseInstructions] = useState(true);
    const [collapseIngredients, setCollapseIngredients] = useState(true);
    const genre = post?.genre;
    const subgenre = post?.subgenre;

    useEffect(() => {

        switch(genre) {
            case 'music':
              switch(subgenre) {
                case 'musicTracks':
                    setListItems(list);
                    break;
                case 'musicAlbums':
                    setListItems(list);
                    break;
                default:
                    setListItems(list);
                    break;
              }
              break;
            case 'movies':
              console.log('MOVIES')
              break;
            case 'food':
              setListItems(list[0]);
              setListItems2(list[1]);
              break;
            default:
              console.log('DEFAULT')
              break;
          }
    
      
    }, [post])
    
    const listLogic = {

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
        handleMoveUp2: (item) => {
            let index = 0;
            const updatedList = listItems2.map((x,i) => {
                if(x.key === item.key) {
                    index = i;
                }
                return x;
            });
            listLogic.changeValuePosition(updatedList,index,index-1);
        
            setListItems2(updatedList);
        },
        handleMoveDown2: (item) => {
            let index = 0;
            const updatedList = listItems2.map((x,i) => {
                if(x.key === item.key) {
                    index = i;
                }
                return x;
            });
            listLogic.changeValuePosition(updatedList,index,index+1);
        
            setListItems2(updatedList);
        },
    }


  return (
    <div>
    {listItems.length && genre==='music' && 
        <Paper sx={{marginTop:5}}>
            {subgenre === 'musicTracks' && <Typography variant='body1'><strong>Music Tracks</strong></Typography>}
            {subgenre === 'musicAlbums' && <Typography variant='body1'><strong>Music Albums</strong></Typography>}
            {subgenre === 'musicArtists' && <Typography variant='body1'><strong>Music Artists</strong></Typography>}
                        <StyledList subheader={<li />}>{
                            listItems.map((item,index) => (
                                <MusicListItem
                                    key={`${item?.key}-${index}`}
                                    listItem={item}
                                    index={index}
                                    length={listItems.length - 1}
                                    subgenre={post?.subgenre}
                                    handleMoveUp = {()=>listLogic.handleMoveUp(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDown(item)}
                                />))
                            } 
                        </StyledList>
                    </Paper> 
                    
                }

    {listItems.length && genre==='food' &&
                    <>
                    <Paper sx={{marginTop:5}}>
                    <Typography variant='body1'><strong>Ingredients</strong></Typography>
                        <Button onClick={()=>setCollapseIngredients(!collapseIngredients)}> {collapseIngredients ? 'Hide' : 'Show'} </Button>
                        <Collapse in={collapseIngredients} timeout="auto" unmountOnExit>
                        <StyledList subheader={<li />}>{
                            listItems.map((item,index) => (
                                <FoodListItem
                                    key={`${item?.key}`}
                                    listItem={item}
                                    index={index}
                                    length={listItems.length - 1}
                                    subgenre='foodRecipe'
                                    handleMoveUp = {()=>listLogic.handleMoveUp(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDown(item)}
                                />))
                            } 
                        </StyledList>
                        </Collapse>
                    </Paper>

                    <Paper sx={{marginTop:5}}>
                    <Typography variant='body1'><strong>Instructions</strong></Typography>
                        <Button onClick={()=>setCollapseInstructions(!collapseInstructions)}> {collapseInstructions ? 'Hide' : 'Show'} </Button>
                        <Collapse in={collapseInstructions} timeout="auto" unmountOnExit>
                        <StyledList subheader={<li />}>{
                            listItems2.map((item,index) => (
                                <FoodListItem
                                    key={`${item?.key}`}
                                    listItem={item}
                                    index={index}
                                    length={listItems.length - 1}
                                    subgenre='instructions'
                                    handleMoveUp = {()=>listLogic.handleMoveUp2(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDown2(item)}
                                />))
                            } 
                        </StyledList>
                        </Collapse>
                    
                    </Paper>
                </>
                }
    </div>
  )
}

export default ListDetails