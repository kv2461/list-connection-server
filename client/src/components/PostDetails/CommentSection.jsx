import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { StyledCommentsInnerContainer, StyledCommentsOuterContainer, StyledList} from './styles';
import { useDispatch } from 'react-redux';

import { CommentPost } from '../../actions/posts';
import Comment from './Comment';

const CommentSection = ({ post }) => {
    const [ comments, setComments ] = useState(post?.comments);
    const [ comment, setComment ] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleComment = async () => {
        const finalComment = {
            username:user.result.username,
            comment:comment,
            id:`comment-${Date.now()}`,
            createdAt: new Date(),
            };
        const newComments = await dispatch(CommentPost(finalComment, post._id));

        setComment('');
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    }

    const handleFocus = () => {
        if (comments.length > 0) {
        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    };

  return (
    <div>
        <StyledCommentsOuterContainer>
            <Typography gutterBottom variant='h6'>Comments</Typography>
     

            
            <StyledList subheader={<li />}>{
                            comments?.map((comment,index) => (
                                <Comment
                                    commentsRef={commentsRef}
                                    key={index}
                                    comment={comment}
                                    index={index}
                                    length = {comments.length}
                                />))
                            } 
            </StyledList>



            {user?.result.username && (<div style={{width:'90%'}}>

                <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                <TextField 
                    fullWidth
                    rows={4}
                    variant='outlined'
                    label='Comment'
                    multiline
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    onFocus={(e)=>handleFocus(e.target.value)}
                />
                <br />
                <Button sx={{marginTop:'10px'}} fullWidth disabled={!comment} variant='contained' onClick={handleComment}>
                    Comment
                </Button>

            </div>)}
        </StyledCommentsOuterContainer>
    </div>
  )
}

export default CommentSection