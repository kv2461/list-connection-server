import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { StyledCommentsOuterContainer, StyledList } from './styles';
import { useDispatch } from 'react-redux';

import { CommentPost } from '../../actions/posts';
import { DeleteComment } from '../../actions/posts';
import { LikeComment } from '../../actions/posts';
import { ReplyComment } from '../../actions/posts';
import Comment from './Comment';

const CommentSection = ({ post }) => {
    const [ comments, setComments ] = useState(post?.comments);
    const [ comment, setComment ] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?._id;
    const commentsRef = useRef();

    useEffect(()=> {
        if (comments.length > 0) {
            commentsRef.current.scrollIntoView({ behavior: 'smooth'});
            }
    },[comments])

    const handleComment = async () => {
        const finalComment = {
            username:user.result.username,
            comment:comment,
            id:`comment-${Date.now()}`,
            createdAt: new Date(),
            likes:[],
            };
        const newComments = await dispatch(CommentPost(finalComment, post._id));

        setComment('');
        setComments(newComments);

        if (comments.length>2) commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    }

    const handleFocus = () => {
        if (comments.length > 0) {
        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    };

    const deleteComment = async (id) => {
        const newComments = await dispatch(DeleteComment(id,post._id));

        setComments(newComments);

    }

    const likeComment = async (id) => {
        const newComments = await dispatch(LikeComment(id,post._id));

        setComments(newComments);

    }

    const replyComment = async (reply, id, replyBool, username) => {
        let finalReply;
        if (replyBool) {
             finalReply = {
                username:user.result.username,
                comment:`@${username} ${reply}`,
                id:`subcomment-${Date.now()}`,
                createdAt: new Date(),
                likes:[],
                };
        } else {
        finalReply = {
            username:user.result.username,
            comment:reply,
            id:`subcomment-${Date.now()}`,
            createdAt: new Date(),
            likes:[],
            };
        }

        const newComments = await dispatch(ReplyComment(finalReply,id,post._id));

        setComments(newComments);
        
    }


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
                                    deleteComment = {deleteComment}
                                    user={user}
                                    likeComment = {likeComment}
                                    userId={userId}
                                    replyComment={replyComment}
                                    postId={post._id}
                                    setComments={setComments}
                                />))
                            } 
            </StyledList>



            {user?.result.username &&  (
                
            <div style={{width:'90%', marginTop:'1rem'}}>
                <TextField 
                    fullWidth
                    rows={4}
                    variant='outlined'
                    label='Add a comment'
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