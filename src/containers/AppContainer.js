import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import * as themes from '../theme';
import App from '../components/App';
import { getTheme } from '../selectors/theme';

class AppContainer extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = { theme: themes[props.theme] };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.theme === props.theme) {
      return state;
    }

    const theme = themes[props.theme];

    renderGlobalTheme(theme);

    return { theme };
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <App />
      </ThemeProvider>
    );
  }
}

AppContainer.propTypes = {
  theme: PropTypes.string.isRequired
};

function renderGlobalTheme(theme) {
  document.body.style['background-color'] = theme.colors.bg;
  document.body.style.color = theme.colors.fg;
}

function mapStateToProps(state) {
  return {
    theme: getTheme(state)
  };
}

export default connect(mapStateToProps)(AppContainer);
