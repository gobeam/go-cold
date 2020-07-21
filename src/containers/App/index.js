/*global chrome*/


import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from 'global-styles';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { routes } from 'routes';
import { isLoggedAction } from 'containers/App/actions';
// Import Components
import SnackBarMessage from 'containers/SnackBar';

import Header from 'components/Header';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import useStyles from 'components/Header/Hook';

export default function App() {
  const dispatch = useDispatch();
  const checkIfLogged = () => dispatch(isLoggedAction());
  const classes = useStyles();
  
  useEffect(() => {
    // checkIfLogged();
    window.addEventListener('storage', e => {
      if (e.key === 'access_token') {
        window.location.reload();
      }
    });
  }, []);
  return (
    <div className={classes.root}>
      <GlobalStyle/>
      <CssBaseline/>
      <Header/>
      <SnackBarMessage/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} component={route.component} exact={route.exact}/>
          ))}
          <Route component={NotFoundPage}/>
        </Switch>
      </main>
      
      {/*<Footer/>*/}
    </div>
  );
}
