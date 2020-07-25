import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  switch: {
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
}));
function Header({darkState, handleThemeChange}) {

  const classes = useStyles();
  return (
    <div className={classes.root}>
    
    <AppBar
      position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>Go Cold</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={darkState} onChange={handleThemeChange} aria-label="login switch" />}
            label={darkState ? 'Dark Mode' : 'Light Mode'}
          />
        </FormGroup>
      </Toolbar>
      
    </AppBar>
    </div>
  );
}

export default Header;
