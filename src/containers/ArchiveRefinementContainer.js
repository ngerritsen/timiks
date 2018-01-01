import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArchiveRefinement from '../components/ArchiveRefinement';
import { sortArchive } from '../actions';

function mapStateToProps(state) {
  return {
    sortBy: state.archive.sortBy
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortArchive }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveRefinement);
