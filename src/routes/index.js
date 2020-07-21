import React from 'react';
import HomePage from 'containers/HomePage/Loadable';
import ListPage from 'containers/ListPage/Loadable';

export const routes = [
  {
    'path': '/index.html',
    'name': 'Add',
    'icon': 'add_circle',
    'component': HomePage,
    'exact': true,
  },
  {
    'path': '/list.html',
    'name': 'Blocked List',
    'icon': 'rule_circle',
    'component': ListPage,
    'exact': true,
  },
];
