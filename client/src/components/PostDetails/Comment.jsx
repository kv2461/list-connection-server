import React, { useState, useEffect, useRef } from 'react'
import { ListItem, ListItemText, Typography, Button, TextField, Collapse } from '@mui/material';
import { useDispatch } from 'react-redux';
import { StyledList } from './styles';
import { DeleteForever, ThumbUpAlt, ThumbUpAltOutlined } from '@mui/icons-material';
import moment from 'moment';

import Replies from './Replies';
import { LikeReply, DeleteReply } from '../../actions/posts';


const Comment = ({ index, comment, length, commentsRef, deleteComment, user, likeComment, userId, replyComment, postId, setComments }) => {
    const [replyOn, setReplyOn] = useState(false);
    const [reply, setReply] = useState('');
    const [replies, setReplies ] = useState(comment?.replies);
    const [collapseReplies, setCollapseReplies] = useState(false);
    const dispatch = useDispatch();
    const repliesRef = useRef();

    const likeReply = async (id) => {
        const newComments = await dispatch(LikeReply(id,comment.id,postId));

        setComments(newComments);
    }

    const deleteReply = async (id) => {
        const newComments = await dispatch(DeleteReply(id,comment.id,postId));

        setComments(newComments);

    }

    useEffect(()=> {
        setReplies(comment?.replies)
    }, [comment])

    useEffect(()=> {
        if (comment?.replies?.length > 0) {
            repliesRef?.current?.scrollIntoView({ behavior: 'smooth'});
            }
    },[replies, collapseReplies, comment?.replies?.length])

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
            <ListItem sx={width<breakpoint?{flexDirection:'column', alignItems:'baseline'}:null} key={index} ref={length-1 === index ? commentsRef : null}>
                  {/* <Box sx={{p:2}} component='img' src={listItem?.thumbnail}/> */}
                <ListItemText 
                  disableTypography 
                  primary={ 
                  <>
                    <div style={{ display: 'flex'}}>
                    <Typography fontSize='0.8rem'><strong>{comment.username}</strong></Typography>
                    <Typography marginLeft='10px' fontSize='0.7rem' sx={{color:'text.secondary'}}variant="body2">{moment(comment.createdAt).fromNow()}</Typography>
                    </div>
                    <Typography fontSize='0.8rem'>{comment.comment}</Typography>

                    <div style={width<breakpoint?{position:'relative',left:'60px', }: null}>
                    <Button onClick={()=>{likeComment(comment.id)}}><Likes /></Button>
                    <Button fontSize='0.7rem' onClick={()=>{setReplyOn(true)}}>Reply</Button>
                    {comment.username === user?.result?.username && <Button onClick={()=>deleteComment(comment.id)}><DeleteForever fontSize='0.7rem'/></Button>}
                </div>

                    {comment.replies !== undefined && comment.replies?.length > 0 &&  (<div>
                        <Button onClick={()=>setCollapseReplies(!collapseReplies)}> {collapseReplies ? 'Hide Replies' : 'Show Replies'} </Button>
                        <Collapse in={collapseReplies} timeout="auto" unmountOnExit>
                        <StyledList sx={{m:'10px 0', p:0}} subheader={<li />}>{
                            replies?.map((reply,index) => (
                                <Replies
                                    replyOn={replyOn}
                                    setReplyOn={setReplyOn}
                                    length={replies.length}
                                    repliesRef={repliesRef}
                                    comment={reply}
                                    key={index}
                                    index={index}
                                    user={user}
                                    userId={userId}
                                    likeComment={likeReply}
                                    deleteComment={deleteReply}
                                    replyComment={replyComment}
                                    parentComment={comment}
                                />))
                            } 
                        </StyledList>
                        </Collapse></div>) }


                  </>
                }
                 />

            </ListItem>
            {replyOn && (
                <>
                    <TextField autoFocus sx={{width:'80%'}}value={reply} onChange={(e)=>setReply(e.target.value)}/>
                    <Button onClick={()=> {setReplyOn(false)}}>cancel</Button>
                    <Button onClick={()=>{replyComment(reply, comment.id);setReply('');setReplyOn(false);setCollapseReplies(true)}}>reply</Button>
                </>)}
        </ul>
  )
}

export default Comment