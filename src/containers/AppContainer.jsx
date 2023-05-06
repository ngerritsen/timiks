import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

import App from "../components/App";
import { getTheme } from "../selectors/theme";

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

    return { theme };
  }

  render() {
    return <App />;
  }
}

AppContainer.propTypes = {
  theme: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    theme: getTheme(state),
  };
}

export default connect(mapStateToProps)(AppContainer);
