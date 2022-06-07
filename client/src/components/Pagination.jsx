import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { GetPosts } from '../actions/posts';


const Paginate = ({ page, subgenreName }) => {
    const { numberOfPages } = useSelector((state)=>state.postsSlice);
    const dispatch = useDispatch();

    useEffect(()=> {
        if ( subgenreName ) {
            dispatch(GetPosts(page,subgenreName))
        } else if (page) dispatch(GetPosts(page));

    },[page,subgenreName, dispatch]);


    return (
        <Pagination
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            sx={{color:'primary.main', '.MuiPagination-ul':{justifyContent:'space-around'}}}
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
            )}
        />

    )
}

export default Paginate