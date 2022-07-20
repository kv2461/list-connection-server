import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';

import DesktopTemplate from './ViewportTemplates/DesktopTemplate';
import MobileTemplate from './ViewportTemplates/MobileTemplate';


import { GetYogaPose } from '../../../../actions/yoga';



const Yoga = ({ currentId,setCurrentId }) => {
    const [yogaPoseName, setYogaPoseName] = useState('')
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [listItems, setListItems] = useState([]); //for list to be saved on db
    const [listItem, setListItem] = useState(0) //for list item to be added on to list
    const [data,setData] = useState([]);
    const dispatch = useDispatch();
    const genre = 'yoga';
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
        const query = yogaPoseName.split(' ').join('+');
        const results = await dispatch(GetYogaPose(query))
        const data = results.slice(0,4);
        setData(data);
    }

    const handleSearch = () => {
        fetchData()
        .catch(console.error);
    }

    useEffect(() => {
      if ((yogaPoseName.length%7===0 || yogaPoseName.length === 5) && yogaPoseName.length !== 0) {

        fetchData() 

        .catch(console.error);
      };
      
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yogaPoseName]) 

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
                    setYogaPoseName('');
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
                setYogaPoseName={setYogaPoseName} 
                setListItem={setListItem} 
                listItem={listItem} 
                yogaPoseName={yogaPoseName} 
                listItems={listItems} 
                listLogic={listLogic} 
                width={width} 
                data={data} 
                handleSearch={handleSearch} 
                readyToSubmit={readyToSubmit} 
                currentId={currentId} 
                setCurrentId={setCurrentId}
                genre={genre}
                subgenre={genre}
            />
    : 
            <MobileTemplate 
                setYogaPoseName={setYogaPoseName} 
                setListItem={setListItem} 
                listItem={listItem} 
                yogaPoseName={yogaPoseName} 
                listItems={listItems} 
                listLogic={listLogic} 
                width={width} 
                data={data} 
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

export default Yoga

