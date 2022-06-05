import React, { useState, useEffect } from 'react'
import {Paper} from '@mui/material';
import {StyledList} from './styles';
import MusicListItem from '../../PostCreation/Lists/Music/MusicListItem';

const ListDetails = ({post,list}) => {
    const [listItems, setListItems] = useState([]);
    
    const genre = post?.genre;
    const subgenre = post?.subgenre;
    console.log(subgenre)
    console.log(genre)
    console.log(list)

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
            default:
              console.log('DEFAULT')
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
    }
    
    



// maybe need a new child component for this where it has a clean array.map feature for the list

//switch case with dependencies on genre and subgenre, storing it into new props that will be passed to child component
//with the same name e.g. 
// if genre is music then const listItemHeader = trackName;    map array -> <Child component listItemHeader = {listItemHeader}  />

    // useEffect(() => {

    //     const genrify = () => {
    //       if (genre === 'musicTracks') {
    //       setName(listItem?.trackName);
    //       } else if (genre === 'musicAlbums') {
    //       setName(listItem?.albumName);
    //       }
    //     }
    
    //     genrify();
    
    //   },[listItem?.albumName,genre,listItem?.trackName])


  return (
    <div>
    {listItems?.length===0 ? null : 
                    <Paper sx={{marginTop:5}}>
                        <StyledList subheader={<li />}>{
                            listItems.map((item,index) => (
                                <MusicListItem
                                    key={`${item?.key}-${index}`}
                                    listItem={item}
                                    index={index}
                                    length={listItems.length - 1}
                                    genre={post?.subgenre}
                                    handleMoveUp = {()=>listLogic.handleMoveUp(item)}
                                    handleMoveDown = {()=>listLogic.handleMoveDown(item)}
                                />))
                            } 
                        </StyledList>
                    </Paper>
                }
    </div>
  )
}

export default ListDetails