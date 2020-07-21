import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { createStructuredSelector } from 'reselect';
import { makeIsLoggedSelector, makeLoggedInUserSelector } from 'containers/App/selectors';
import AppBar from '@material-ui/core/AppBar/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { useTheme } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from 'components/Header/Hook';
import { routes } from 'routes';
import Icon from '@material-ui/core/Icon';
import history from 'utils/history';

const key = 'global';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
});

function Header() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  useInjectSaga({ key: key, saga });
  
  const { user, isLogged } = useSelector(
    stateSelector,
  );
  
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    // checkIfLogged();
  }, []);
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            GO COLD
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </div>
        <Divider/>
        
        <List>
          {routes.map((text, index) => (
            <ListItem button key={index} onClick={ () => history.push(text.path)}>
              {/*<Link to={text.path}>*/}
              <ListItemIcon><Icon>{text.icon}</Icon></ListItemIcon>
              <ListItemText primary={text.name}/>
              {/*</Link>*/}
              
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  );
}

export default Header;
