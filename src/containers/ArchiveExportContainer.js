import { connect } from 'react-redux';

import ArchiveExport from '../components/archive/ArchiveExport';

function mapStateToProps(state) {
  return {
    exportData: JSON.stringify(state.archive.items)
  }
}

export default connect(mapStateToProps)(ArchiveExport);
