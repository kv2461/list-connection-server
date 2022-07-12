import { Card, CardMedia, Typography, CardActions, ButtonBase, SvgIcon } from '@mui/material';
import { styled } from '@mui/system';
// import { theme } from '../../Theme';


export const StyledCard = styled(Card, {})({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
});

export const StyledCardMedia = styled(CardMedia,{})({
  height: 0,
  paddingTop: '56.25%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundBlendMode: 'darken',
})

export const StyledTypography = styled(Typography,{})({
  padding: '0 16px',
})

export const StyledCardActions = styled(CardActions,{})({
  padding: '0 16px 8px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row-reverse'
})

export const StyledOverlay = styled('div',{})({
  position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
})

export const StyledOverlay2 = styled('div',{})({
  position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
})

export const StyledDetails = styled('div',{})({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '5px',
})

export const StyledButtonBase = styled(ButtonBase,{})({
  display:'block',
  textAlign:'initial'
})

export const StyledSvgIcon = styled(SvgIcon,{})({
  fontSize:'20px',
  margin:'0 5px',
})

// export default makeStyles({
//   media: {
//     height: 0,
//     paddingTop: '56.25%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     backgroundBlendMode: 'darken',
//   },
//   border: {
//     border: 'solid',
//   },
//   fullHeightCard: {
//     height: '100%',
//   },
//   card: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     borderRadius: '15px',
//     height: '100%',
//     position: 'relative',
//   },
//   overlay: {
//     position: 'absolute',
//     top: '20px',
//     left: '20px',
//     color: 'white',
//   },
//   overlay2: {
//     position: 'absolute',
//     top: '20px',
//     right: '20px',
//     color: 'white',
//   },
//   grid: {
//     display: 'flex',
//   },
//   details: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     margin: '20px',
//   },
//   title: {
//     padding: '0 16px',
//   },
//   cardActions: {
//     padding: '0 16px 8px 16px',
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
// });