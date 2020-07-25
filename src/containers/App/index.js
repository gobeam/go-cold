import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from 'global-styles';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { routes } from 'routes';
import SnackBarMessage from 'containers/SnackBar';
import Header from 'components/Header';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import useStyles from 'components/Header/Hook';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';
import { useLocalStorage } from 'hooks/localstorage';

export default function App() {
  const classes = useStyles();
  const [darkState, setDarkState] = useLocalStorage('theme', false);
  const palletType = darkState ? 'dark' : 'light';
  const mainPrimaryColor = darkState ? orange[500] : teal[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle/>
      <CssBaseline/>
      <Header handleThemeChange={handleThemeChange} darkState={darkState}/>
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
    </ThemeProvider>
  );
}
