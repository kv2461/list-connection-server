import { Grid, List } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../../../../Theme';


export const StyledGrid = styled(Grid, {})({
    padding:theme.spacing(2),
  });


export const StyledList = styled(List, {})({
    width:'100%',
    maxWidth:500,
    backgroundColor:'backround.paper',
    position:'relative',
    overflow:'auto',
    maxHeight:500,
    '& ul':{padding:0},
})