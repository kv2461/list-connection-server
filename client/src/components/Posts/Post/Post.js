import React from 'react';
import {CardContent,Button,Typography} from '@mui/material';
import { StyledCard,StyledCardMedia,StyledTypography,StyledCardActions,StyledOverlay,StyledOverlay2,StyledDetails } from './styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'

const Post = ({post}) => {
    
  return (
    <StyledCard>
      <StyledCardMedia image={post.selectedFile} title={post.title}/>
      <StyledOverlay>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </StyledOverlay>
      <StyledOverlay2>
        <Button style={{color:'white'}} size='small' onClick={()=>{}}>
          <MoreHorizIcon fontSize='default'/>
        </Button>
      </StyledOverlay2>
      <StyledDetails>
        <Typography variant='body2' sx={{color:'secondary.main'}}>{post.tags.map((tag)=>`#${tag} `)}</Typography>
      </StyledDetails>
      <StyledTypography gutterBottom variant='h5' component='h2'>{post.title}</StyledTypography>
      <CardContent>
        <Typography variant='body2' gutterBottom component='p'>{post.description}</Typography>
      </CardContent>
      <StyledCardActions>
        <Button size='small' sx={{color:'primary.main'}} onClick={()=>{}}>
          <ThumbUpAltIcon fontSize='small' />
          Like
          {post.likeCount}
        </Button>
        <Button size='small' sx={{color:'primary.main'}} onClick={()=>{}}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </StyledCardActions>
    </StyledCard>
  )
}

export default Post