import React,{ useState, useEffect } from 'react';
import { Typography, ButtonBase } from '@mui/material';

const More = ({ message, limit, variant, sx, component }) => {
    const [more,setMore] = useState(`${message.slice(0,limit)}...`)
    const [moreButton, setMoreButton] = useState(false);

    const handleMore = () => {
        setMoreButton(!moreButton);
    }

    useEffect(() => {
    if (moreButton) {
        setMore(message);
    } else {
        setMore(`${message.slice(0,limit)}...`)
    }

    },[moreButton,message,limit])

  return ( <>
      {message.length < limit ?
        <Typography variant={variant} sx={sx} component={component}>{message}</Typography>  
      :
      <Typography variant={variant} sx={sx} component={component}>{more}   <ButtonBase onClick={handleMore} ><strong>{moreButton ? 'less' : 'more'}</strong></ButtonBase></Typography>}
  </>
  )
}

export default More