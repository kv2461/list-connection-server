import { Grid, List } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

export const StyledChatSection = styled(Grid, {})({
    width:'120vh',
    height: '60vh',
    borderRight: '1px solid #e0e0e0',
    [theme.breakpoints.down('sm')]: {
        width:'100%',
      },
});

export const StyledBorderRight500 = styled(Grid, {})({
    borderRight: '1px solid #e0e0e0',
    [theme.breakpoints.down('sm')]: {
        borderRight:'none'
      },
});

export const StyledMessageArea = styled(List, {})({
    height: '45vh',
    overflowY: 'auto',
})




