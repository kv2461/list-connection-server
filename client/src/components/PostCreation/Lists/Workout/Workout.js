import React, { useState, useEffect } from 'react';
import { Container, } from '@mui/material';
import { useDispatch } from 'react-redux';

import DesktopTemplate from './ViewportTemplates/DesktopTemplate'
import MobileTemplate from './ViewportTemplates/MobileTemplate';


import { GetWorkout } from '../../../../actions/wger';



const Workout = ({currentId,setCurrentId}) => {
    const [workoutName, setWorkoutName] = useState('')
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [listItems, setListItems] = useState([]); //for list to be saved on db
    const [listItem, setListItem] = useState(0) //for list item to be added on to list
    const [data,setData] = useState([]);
    const dispatch = useDispatch();
    // const subgenre = '';
    const genre = 'workout';
    //resize masonry component
    const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=> {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize',handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    },[])

    return {width};
    }   

    const {width} = useViewport();
    const breakpoint = 500;

    const fetchData = async () => {
        const term = workoutName.split(' ').join('+');
        const {suggestions} = await dispatch(GetWorkout(term))
        console.log(suggestions);
        if (suggestions){
            setData(suggestions.slice(0,4));
        }
    }

    const handleSearch = () => {
        fetchData()
        .catch(console.error);
    }

    useEffect(() => {
      if (workoutName.length%7===0 || workoutName.length === 5) {

        fetchData() 

        .catch(console.error);
      };
      
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutName]) 

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
                    setWorkoutName('');
                }
        },
    
        editSubmit: () => {
            setReadyToSubmit(false);
        }
    
    }
    
    
    

  return (
    <Container>
        {width > breakpoint ? 
            <DesktopTemplate 
                setWorkoutName={setWorkoutName} 
                setListItem={setListItem} 
                listItem={listItem} 
                workoutName={workoutName} 
                listItems={listItems} 
                listLogic={listLogic} 
                width={width} 
                data={data} 
                handleSearch={handleSearch} 
                setData={setData}
                readyToSubmit={readyToSubmit} 
                currentId={currentId} 
                setCurrentId={setCurrentId}
                genre={genre}
                subgenre={genre}
            />
    : 
            <MobileTemplate 
                setWorkoutName={setWorkoutName} 
                setListItem={setListItem} 
                listItem={listItem} 
                workoutName={workoutName} 
                listItems={listItems} 
                listLogic={listLogic} 
                width={width} 
                data={data} 
                setData={setData}
                handleSearch={handleSearch} 
                readyToSubmit={readyToSubmit} 
                currentId={currentId} 
                setCurrentId={setCurrentId}
                genre={genre}
                subgenre={genre}
            /> 
           
    }   

    </Container>
  )
}

export default Workout

