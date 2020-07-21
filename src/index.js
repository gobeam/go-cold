/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
// Import root app
import App from 'containers/App';
// Import Language Provider
// Load the favicon and the .htaccess file
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
import configureStore from 'configureStore';
// Import i18n messages
import { loadState, saveState } from 'services/persist.service';
import { throttle } from 'lodash';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Roboto', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = loadState();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

store.subscribe(throttle(() => {
  saveState({
    language: store.getState().language,
    global: store.getState().global,
  });
}, 1000));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};


render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
