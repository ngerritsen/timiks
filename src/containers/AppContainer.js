import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import * as themes from '../theme';
import App from '../components/App';
import { getTheme } from '../selectors/settings';

class AppContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { theme: null };
  }

  componentWillMount() {
    this._changeTheme(this.props.theme);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this._changeTheme(nextProps.theme);
    }
  }

  _changeTheme(name) {
    const theme = themes[name];

    renderGlobalTheme(theme);

    this.setState({ theme });
    this.forceUpdate();
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    );
  }
}

AppContainer.propTypes = {
  theme: PropTypes.string.isRequired
};

function renderGlobalTheme(theme) {
  document.body.style['font-family'] = theme.font;
  document.body.style['background-color'] = theme.colors.bg;
  document.body.style.color = theme.colors.fg;
}

function mapStateToProps(state) {
  return {
    theme: getTheme(state)
  };
}

export default connect(mapStateToProps)(AppContainer);
