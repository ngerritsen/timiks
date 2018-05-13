import 'element-closest';

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import keymap from './constants/keymap';
import { APP_ROOT_SELECTOR } from './constants/app';
import AppContainer from './containers/AppContainer';
import store from './store';
import ShortcutProvider from './containers/ShortcutProvider';

const rootEl = document.querySelector(APP_ROOT_SELECTOR);

injectGlobal`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <ShortcutProvider keymap={keymap}>
      <AppContainer/>
    </ShortcutProvider>
  </Provider>,
  rootEl
);
