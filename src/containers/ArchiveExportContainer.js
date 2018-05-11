import { connect } from 'react-redux';

import ArchiveExport from '../components/archive/ArchiveExport';
import { serializeArchive } from '../helpers/serialization';

function mapStateToProps(state) {
  return {
    exportData: JSON.stringify(serializeArchive(state.archive.items))
  }
}

export default connect(mapStateToProps)(ArchiveExport);
