import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useUser} from '../firebase/useUser'

export default function MenuAppBar() {
  const { user, logout } = useUser()
  const [auth, setAuth] = React.useState(!!user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (auth) {
      logout()
    } 
  };

  React.useEffect(() => {
    setAuth(!!user)
  }, [user])

  return (
    <FormGroup sx={{position: 'absolute',
      right: '40px',
      top: '40px'}}>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
              color="default"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
  );
}