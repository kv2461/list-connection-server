import { Grid, AppBar, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme'


export const StyledGrid = styled(Grid,{})({
  [theme.breakpoints.down('sm')]: {
    flexDirection:'column-reverse'
  }
})

export const StyledAppBarSearch = styled(AppBar,{})({
  borderRadius:4,
  marginBottom:'1rem',
  display:'flex',
  padding:'16px',
})

export const StyledPaperPagination = styled(Paper,{})({
  borderRadius:4,
  marginTop:'1rem',
  padding:'16px',
})