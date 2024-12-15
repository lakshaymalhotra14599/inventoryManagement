import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Box } from '@mui/material';

// Type
import { RoleType } from '../inventoryReducer/index'; 

// Constants
import { SET_USER } from '../inventoryReducer/constants';

// Context
import { useRoleContext } from '../hooks/useRoleContext';

const HeaderBar: React.FC = () => {
    const { state, dispatch } = useRoleContext();
    const handleToggle = () => {
        const newRole: RoleType = state.currentUser.role === 'ADMIN' ? 'USER' : 'ADMIN';
        dispatch({
          type: SET_USER,
          payload: { ...state.currentUser, role: newRole },
        });
      };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}> 
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            User
          </Typography>
          <Switch
            checked={state.currentUser.role === 'ADMIN'}
            onChange={handleToggle}
            inputProps={{ 'aria-label': 'Role Toggle' }}
          />
          <Typography variant="body1">Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
