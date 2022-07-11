import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBarMenu({chat, setChat, setNewMessage, user, logout}) {
const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user && 
        <div>
            <MenuItem onClick={()=>{handleClose();navigate('/createPost')}}>Create New List</MenuItem>
            <MenuItem onClick={()=>{handleClose();navigate(`/user/${user.result.username}`)}}>Profile</MenuItem>
            <MenuItem onClick={()=>{handleClose();setChat(!chat);setNewMessage(false)}} >Chat</MenuItem>
            <MenuItem onClick={()=>{handleClose();logout()}}>Logout</MenuItem>
        </div>
        }

        {!user && <MenuItem onClick={()=>{handleClose();navigate('/auth')}}>Sign in</MenuItem> }
        
      </Menu>
    </div>
  );
}