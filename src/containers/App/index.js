/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment, useEffect } from 'react';
import {useDispatch} from "react-redux";
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GlobalStyle from 'global-styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import {routes} from 'routes'
import {isLoggedAction} from "containers/App/actions";
// Import Components
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function App() {
  const dispatch = useDispatch();
  const checkIfLogged = () => dispatch(isLoggedAction());
  
  useEffect(() => {
    // checkIfLogged();
    window.addEventListener('storage', e => {
      if(e.key === 'access_token') {
        window.location.reload()
      }
    });
  }, []);
  return (
    <Fragment>
        <Helmet
            titleTemplate="%s - Starter"
            defaultTitle="Starter">
            <meta name="description" content="Roshan Ranabhat" />
        </Helmet>
        <Header/>
      <Switch>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} component={route.component} exact={route.exact}/>
        ))}
        <Route component={NotFoundPage}/>
      </Switch>
        <Footer/>
        <GlobalStyle/>
    </Fragment>
  );
}
