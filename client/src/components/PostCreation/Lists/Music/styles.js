import {Card, SvgIcon, Grid, List} from '@mui/material';
import {styled} from '@mui/system';
import { theme } from '../../../../Theme';


export const StyledCard = styled(Card,{})({
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:'15px',
    height:'100%',
    position:'relative',
    '&:hover':{
        cursor:'pointer',
        backgroundColor: 'rgba(128,128,128,0.1)'
    }
})

export const StyledSvgIcon = styled(SvgIcon,{})({
    fontSize:'100px',
})

export const StyledGrid = styled(Grid, {})({
    padding:theme.spacing(2),
  });

  export const StyledGrid2 = styled(Grid, {})({
    [theme.breakpoints.down('sm')]: {
        flexDirection:'column-reverse'
    }
  });

export const StyledList = styled(List, {})({
    width:'100%',
    maxWidth:500,
    backgroundColor:'backround.paper',
    position:'relative',
    overflow:'auto',
    maxHeight:700,
    '& ul':{padding:0},
})