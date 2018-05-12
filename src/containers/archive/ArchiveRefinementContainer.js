import { connect } from 'react-redux';

import ArchiveRefinement from '../../components/archive/ArchiveRefinement';
import { sortArchive, filterArchive } from '../../actions';

function mapStateToProps(state) {
  return {
    sortBy: state.archive.sortBy,
    puzzle: state.archive.puzzle
  };
}

export default connect(
  mapStateToProps,
  { sortArchive, filterArchive }
)(ArchiveRefinement);
