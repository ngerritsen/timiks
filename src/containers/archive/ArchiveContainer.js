import { connect } from 'react-redux';

import Archive from '../../components/archive/Archive';
import { calculateStats } from '../../helpers/times';

function mapStateToProps(state) {
  const stats = calculateStats(state.times.archived);

  return {
    times: state.times.archived,
    ao5s: stats.ao5.all,
    ao12s: stats.ao12.all
  }
}

export default connect(
  mapStateToProps
)(Archive);
