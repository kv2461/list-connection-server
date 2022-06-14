import React, {useState, useEffect} from 'react'
import { ListItem, ListItemText, Typography, Button } from '@mui/material';
import { DeleteForever, ThumbUpAlt, ThumbUpAltOutlined } from '@mui/icons-material';
import moment from 'moment';


const Comment = ({index, comment, length, commentsRef, deleteComment, user, likeComment, userId }) => {
    const useViewport = () => {
        const [width, setWidth] = useState(window.innerWidth);
        
        useEffect(()=> {
            const handleWindowResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleWindowResize);
            return () => window.removeEventListener('resize', handleWindowResize);
        }, [])

        return {width};
    }

    const {width} = useViewport();
    const breakpoint = 500;

    const Likes = () => {
        if (comment.likes.length > 0) {
            return comment.likes.find((like) => like === userId)
                ? (
                    <Typography fontSize='0.7rem' ><ThumbUpAlt fontSize='xs' />
                    &nbsp;{comment.likes.length > 2 ? `You and ${comment.likes.length - 1} others` : `${comment.likes.length} like${comment.likes.length>1 ? 's': ''}`}
                    </Typography>
                ) : <Typography fontSize='0.7rem' ><ThumbUpAltOutlined fontSize='xs' />
                    &nbsp;{comment.likes.length} {comment.likes.length === 1 ? 'Like' : 'Likes'}
                    </Typography>
        }

        return  <Typography fontSize='0.7rem' ><ThumbUpAltOutlined fontSize='xs' />&nbsp;Like</Typography>;
        
    };


  return (
        <ul>
            <ListItem sx={width<breakpoint?{flexDirection:'column'}:null} key={index} ref={length-1 === index ? commentsRef : null}>
                  {/* <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/> */}
                <ListItemText 
                  disableTypography 
                  primary={ 
                  <>
                    <div style={{ display: 'flex',}}>
                    <Typography fontSize='0.8rem'><strong>{comment.username}</strong></Typography>
                    <Typography fontSize='0.7rem' sx={{color:'text.secondary'}}variant="body2">{moment(comment.createdAt).fromNow()}</Typography>
                    </div>
                    <Typography fontSize='0.8rem'>{comment.comment}</Typography>
                  </>
                }
                 />
                 
                <div>
                    <Button onClick={()=>{likeComment(comment.id)}}><Likes /></Button>
                    {comment.username === user?.result?.username && <Button onClick={()=>deleteComment(comment.id)}><DeleteForever fontSize='15px'/></Button>}
                </div>
                 {/* <Box sx={{display:'flex', flexDirection:'column'}}>
                     
                      {index===0 ? null : <Button onClick={handleMoveUp}><KeyboardArrowUp/></Button>}
                      {index===length ? null : <Button onClick={handleMoveDown}><KeyboardArrowDown/></Button>}
                 </Box> */}
            </ListItem>
        </ul>
  )
}

export default Comment