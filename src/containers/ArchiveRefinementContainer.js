import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArchiveRefinement from '../components/ArchiveRefinement';
import { sortArchive, filterArchive } from '../actions';

function mapStateToProps(state) {
  return {
    sortBy: state.archive.sortBy,
    puzzle: state.archive.puzzle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortArchive, filterArchive }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveRefinement);
