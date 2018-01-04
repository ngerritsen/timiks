import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ThemeSelector from '../components/ThemeSelector';
import { changeTheme } from '../actions';

function mapStateToProps(state) {
  return {
    theme: state.settings.theme
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeTheme }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector);
