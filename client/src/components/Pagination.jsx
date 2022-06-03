import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';


const Paginate = () => {
    
    return (
        <Pagination
            count={5}
            page={1}
            variant='outlined'
            sx={{color:'primary.main', '.MuiPagination-ul':{justifyContent:'space-around'}}}
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`}/>
            )}
        />

    )
}

export default Paginate