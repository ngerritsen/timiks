import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';

function mapStateToProps(state) {
  return {
    times: state.times.archived
  }
}

export default connect(
  mapStateToProps
)(Archive);
