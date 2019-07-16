import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import faEye from '@fortawesome/fontawesome-pro-solid/faEye';

import IconButton from '../shared/IconButton';
import Shortcut from '../shared/Shortcut';
import Modal from '../shared/Modal';
import ToggleContent from '../shared/ToggleContent';
import TrainerCaseDetails from '../trainer/TrainerCaseDetails';
import * as CustomPropTypes from '../../propTypes';
import { buildFullCaseTitle } from '../../helpers/trainer';

const ScrambleCaseView = ({ trainingCase, trainingType }) => (
  <ToggleContent
    toggle={({ show, toggle }) => (
      <IconButton onClick={show}>
        <Shortcut command="showScramble" action={toggle} />
        <FontAwesome icon={faEye} />
      </IconButton>
    )}
    content={({ hide }) => (
      <Modal title={buildFullCaseTitle(trainingCase, trainingType)} onClose={hide}>
        <TrainerCaseDetails trainingCase={trainingCase} trainingType={trainingType} />
      </Modal>
    )}
  />
);

ScrambleCaseView.propTypes = {
  trainingCase: CustomPropTypes.Case.isRequired,
  trainingType: PropTypes.string.isRequired
};

export default ScrambleCaseView;
