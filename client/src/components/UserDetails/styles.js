import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

export const StyledGrid = styled(Grid, {})({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection:'column-reverse'
  },
});