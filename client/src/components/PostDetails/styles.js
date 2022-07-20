import { Paper, List } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

export const StyledDivCard = styled('div', {})({
    display:'flex',
    width:'100%',
    [theme.breakpoints.down('sm')]: {
        flexWrap:'wrap',
        flexDirection:'column',
        
    },
});

export const StyledDivSection = styled('div',{})({
    borderRadius:'20px',
    margin:'10px',
    flex:1,
});

export const StyledRecommendedPosts = styled('div',{})({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
})

export const StyledDivImageSection = styled('div',{})({
    marginLeft:'20px',
    [theme.breakpoints.down('sm')]: {
        margin:0,
    },
});

export const StyledImgMedia = styled('img',{})({
    borderRadius:'20px',
    objectFit:'cover',
    width:'100%',
    maxWidth:'500px',
    maxHeight:'600px',
    [theme.breakpoints.down('sm')]: {
        maxWidth:'260px',
    },
})

export const StyledLoadingPaper = styled(Paper,{})({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'20px',
    borderRadius:'15px',
    height:'39vh'
})

export const StyledCommentsOuterContainer = styled('div',{})({
    display:'flex',
    flexDirection:'column',
})

export const StyledCommentsInnerContainer = styled('div',{})({
    height:'200px',
    overflowY:'auto',
    marginRight:'30px',
})

export const StyledList = styled(List, {})({
    width:'100%',
    backgroundColor:'background.paper',
    position:'relative',
    overflow:'auto',
    maxHeight:'300px',
    '& ul':{padding:0},
})
