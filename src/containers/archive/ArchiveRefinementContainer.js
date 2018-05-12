import { connect } from 'react-redux';

import ArchiveRefinement from '../../components/archive/ArchiveRefinement';
import { sortArchive, filterArchive } from '../../actions';

function mapStateToProps(state) {
  const { sortBy, puzzle } = state.archive;
  return { sortBy, puzzle };
}

export default connect(
  mapStateToProps,
  { sortArchive, filterArchive }
)(ArchiveRefinement);
