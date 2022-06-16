import { Grid, List } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Theme';

export const StyledChatSection = styled(Grid, {})({
    width: '150%',
    height: '60vh'
});

export const StyledBorderRight500 = styled(Grid, {})({
    borderRight: '1px solid #e0e0e0'
});

export const StyledMessageArea = styled(List, {})({
    height: '50vh',
    overflowY: 'auto'
})




