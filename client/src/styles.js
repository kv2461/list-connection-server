import { AppBar, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledAppBar = styled(AppBar, {})({
  borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
});

export const StyledTypography = styled(Typography,{})({
  color: 'rgba(0,183,255, 1)'
})

// export default makeStyles(() => ({
//   appBar: {
//     borderRadius: 15,
//     margin: '30px 0',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     color: 'rgba(0,183,255, 1)',
//   },
//   image: {
//     marginLeft: '15px',
//   },
// }));