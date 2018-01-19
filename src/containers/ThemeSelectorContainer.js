import { connect } from 'react-redux';

import ThemeSelector from '../components/ThemeSelector';
import { changeTheme } from '../actions';

function mapStateToProps(state) {
  return {
    theme: state.settings.theme
  };
}

export default connect(mapStateToProps, { changeTheme })(ThemeSelector);
