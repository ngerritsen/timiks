import { connect } from 'react-redux';

import NewVersionPrompt from '../../components/messages/NewVersionPrompt';
import { shouldPromptNewVersion } from '../../selectors/version';
import { dismissNewVersion } from '../../actions';

function mapStateToProps(state) {
  return {
    shouldPromptNewVersion: shouldPromptNewVersion(state),
    reload: () => window.location.reload(true)
  };
}

export default connect(
  mapStateToProps,
  { dismissNewVersion }
)(NewVersionPrompt);
