import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import {theme} from '../../Theme'


export const StyledGrid = styled(Grid,{})({
  [theme.breakpoints.down('sm')]: {
    flexDirection:'column-reverse'
  }
})