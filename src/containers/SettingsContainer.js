import { connect } from 'react-redux';

import { changeSetting } from '../actions';
import Settings from '../components/Settings';
import { getSettings } from '../selectors/settings';

function mapStateToProps(state) {
  return {
    settings: getSettings(state)
  };
}

export default connect(mapStateToProps, { changeSetting })(Settings);
