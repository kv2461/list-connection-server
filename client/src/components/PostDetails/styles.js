import { Paper } from '@mui/material';
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

export const StyledDivImageSection = styled('div',{})({
    marginLeft:'20px',
    [theme.breakpoints.down('sm')]: {
        margin:'20px',
    },
});

export const StyledImgMedia = styled('img',{})({
    borderRadius:'20px',
    objectFit:'cover',
    width:'100%',
    maxWidth:'500px',
    maxHeight:'600px',
})

export const StyledLoadingPaper = styled(Paper,{})({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'20px',
    borderRadius:'15px',
    height:'39vh'
})