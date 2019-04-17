import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';
import { calculateStats } from '../../helpers/times';

function mapStateToProps(state) {
  return {
    times: state.times.archived,
    stats: calculateStats(state.times.archived)
  }
}

export default connect(
  mapStateToProps
)(Archive);
