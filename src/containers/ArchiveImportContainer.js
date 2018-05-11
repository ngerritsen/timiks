import { connect } from 'react-redux';

import { changeImportInput, importArchive } from '../actions';
import { validateArchiveImport } from '../helpers/archive';
import { parseArchive } from '../helpers/serialization';
import ArchiveImport from '../components/archive/ArchiveImport';

function mapStateToProps(state) {
  return {
    importInput: state.archive.importInput,
    isValid: validateArchiveImport(state.archive.importInput)
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    importArchive() {
      dispatchProps.importArchive(parseArchive(JSON.parse(stateProps.importInput)))
    }
  }
}

export default connect(
  mapStateToProps,
  { changeImportInput, importArchive },
  mergeProps
)(ArchiveImport);
