import { connect } from 'react-redux';

import { closeModal, openModal } from '../../actions';
import Modal from '../../components/shared/Modal';
import { isModalOpen } from '../../selectors/modal';

function mapStateToProps(state, ownProps) {
  return {
    isOpen: isModalOpen(state, ownProps.id)
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    openModal: () => dispatchProps.openModal(ownProps.id)
  }
}

export default connect(mapStateToProps, { closeModal, openModal }, mergeProps)(Modal)
