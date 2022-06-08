import React, { useState, useEffect } from 'react'
import { Container } from '@mui/material'
import { useDispatch } from 'react-redux';

import DesktopTemplate from './ViewportTemplates/DesktopTemplate';
import MobileTemplate from './ViewportTemplates/MobileTemplate';

import { GetSpoonacularSuggestions } from '../../../../actions/foodcentral';


const Recipes = ({currentId, setCurrentId}) => {
    
    const [ingredientName,setIngredientName] = useState('');
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    const [ingredientItem, setIngredientItem] = useState(0);
    const [ingredientsItems, setIngredientsItems] = useState([]);

    const [instructionItem, setInstructionItem] = useState(0);
    const [instructionsItems, setInstructionsItems] = useState([]);

    const [listItems, setListItems] = useState([]); //for list to be saved on db
    const [listItem, setListItem] = useState(0) //for list item to be added on to list
    const [data,setData] = useState([]);
    const dispatch = useDispatch();
    const subgenre = 'foodRecipe';
    const genre = 'food';
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
        
        const query = ingredientName.split(' ').join(' ');
        if (query.length > 0) {
            const { results } = await dispatch(GetSpoonacularSuggestions(query))
            setData(results.slice(0,4));
        }
        
    }

    const handleSearch = () => {
        fetchData()
        .catch(console.error);
    }

    useEffect(() => {
        if (ingredientName.length%7===0 || ingredientName.length === 5) {
  
          fetchData() 
  
          .catch(console.error);
        };
        
          //eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ingredientName]) 
  
      const listLogic = {
          handleAddIngredient:() => {
              setIngredientsItems([...ingredientsItems, ingredientItem]);
              setIngredientItem(0);
          },
          handleAddInstruction: () => {
              setInstructionsItems([...instructionsItems, instructionItem]);
              setInstructionItem(0);
          },
          handleDeleteIngredient: (item) => {
              setIngredientsItems(ingredientsItems.filter(i => i !== item))
          },
          handleDeleteInstructions: (item) => {
              setInstructionsItems(instructionsItems.filter(i => i !== item))
          },
          changeValuePosition: (arr,init,target) => {
              [arr[init], arr[target]] = [arr[target],arr[init]];
              return arr;
          },
          handleMoveUpIngredient: (item) => {
              let index = 0;
              const updatedList = ingredientsItems.map((x,i) => {
                  if(x.key === item.key) {
                      index = i;
                  }
                  return x;
              });
              listLogic.changeValuePosition(updatedList,index,index-1);
          
              setIngredientsItems(updatedList);
          },
          handleMoveDownIngredient: (item) => {
              let index = 0;
              const updatedList = ingredientsItems.map((x,i) => {
                  if(x.key === item.key) {
                      index = i;
                  }
                  return x;
              });
              listLogic.changeValuePosition(updatedList,index,index+1);
          
              setIngredientsItems(updatedList);
          },
          handleMoveUpInstructions: (item) => {
              let index = 0;
              const updatedList = instructionsItems.map((x,i) => {
                  if(x.key === item.key) {
                      index = i;
                  }
                  return x;
              });
              listLogic.changeValuePosition(updatedList,index,index-1);
          
              setInstructionsItems(updatedList);
          },
          handleMoveDownInstructions: (item) => {
              let index = 0;
              const updatedList = instructionsItems.map((x,i) => {
                  if(x.key === item.key) {
                      index = i;
                  }
                  return x;
              });
              listLogic.changeValuePosition(updatedList,index,index+1);
          
              setInstructionsItems(updatedList);
          },
      
          preSubmit: () => {
                  if (listItems.length>0){
                      setReadyToSubmit(true);
                      setIngredientName('');
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
                setData={setData}
                instructionItem={instructionItem}
                setInstructionItem={setInstructionItem}
                instructionsItems={instructionsItems}
                setInstructionsItems={setInstructionsItems}
                setIngredientName={setIngredientName} 
                setIngredientsItems={setIngredientsItems}
                setIngredientItem={setIngredientItem}
                ingredientItem={ingredientItem}
                ingredientsItems={ingredientsItems}
                setListItem={setListItem} 
                listItem={listItem} 
                ingredientName={ingredientName} 
                listItems={listItems} 
                listLogic={listLogic} 
                width={width} 
                data={data} 
                handleSearch={handleSearch} 
                readyToSubmit={readyToSubmit} 
                currentId={currentId} 
                setCurrentId={setCurrentId}
                genre={genre}
                subgenre={subgenre}
            />
    : 
            <MobileTemplate 
                setIngredientName={setIngredientName} 
                setListItem={setListItem} 
                listItem={listItem} 
                ingredientName={ingredientName} 
                listItems={listItems} 
                listLogic={listLogic} 
                width={width} 
                data={data} 
                handleSearch={handleSearch} 
                readyToSubmit={readyToSubmit} 
                currentId={currentId} 
                setCurrentId={setCurrentId}
                genre={genre}
                subgenre={subgenre}
            />
    }   

    </Container>
  )
}

export default Recipes