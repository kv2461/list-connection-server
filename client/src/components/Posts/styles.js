import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

const StyledGrid = styled(Grid, {})({
  padding: theme.spacing(2)
});

// export default makeStyles((theme) => ({
//   mainContainer: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   smMargin: {
//     margin: theme.spacing(1),
//   },
//   actionDiv: {
//     textAlign: 'center',
//   },
// }));

export { StyledGrid }