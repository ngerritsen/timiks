import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FullScreenMask from './FullScreenMask';
import PrepartionCircles from './PreparationCircles';
import Button from '../shared/Button';
import ManualTimeEntryExplanation from './ManualTimeEntryExplanation';

const Activation = ({
  inspectionMode,
  preparationStage,
  preparing,
  preparingForInspection,
  ready,
  stopped,
  submitTimeInput,
  useInspectionTime,
  useManualTimeEntry,
  validTimeInput
}) => (
  <ActivationContainer {...(stopped ? {} : { 'data-stop': true })}>
    <Button
      big primary data-activation
      disabled={useManualTimeEntry && !validTimeInput}
      onClick={() => useManualTimeEntry && validTimeInput && submitTimeInput()}
    >
      {(() => {
        switch(true) {
          case useManualTimeEntry:
            return 'Submit';
          case !stopped:
            return 'Stop';
          case preparingForInspection:
            return 'Ready';
          case preparing || ready:
            return <PrepartionCircles preparationStage={preparationStage}/>
          default:
            return 'Start' + (useInspectionTime ? ' inspection' : '');
        }
      })()}
    </Button>

    <Explain>
      {(() => {
        switch(true) {
          case useManualTimeEntry:
            return <ManualTimeEntryExplanation/>;
          case preparingForInspection:
            return 'Release to start inspection';
          case preparing && ready:
            return 'Release to start!';
          case preparing && !ready:
            return 'Hold on...';
          case !stopped:
            return <span>Click, tap or smash <Spacebar/> spacebar to stop</span>;
          default:
            return <span>Click, touch or press <Spacebar/> spacebar. Hold and release to start{useInspectionTime ? ' inspection' : ''}</span>;
        }
      })()}
    </Explain>

    {(!stopped || preparing || preparingForInspection || inspectionMode) && <FullScreenMask/>}
  </ActivationContainer>
);

Activation.propTypes = {
  inspectionMode: PropTypes.bool.isRequired,
  preparationStage: PropTypes.number.isRequired,
  preparing: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  stopped: PropTypes.bool.isRequired,
  submitTimeInput: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  useManualTimeEntry: PropTypes.bool.isRequired,
  validTimeInput: PropTypes.bool.isRequired
};

const ActivationContainer = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
`;

const Explain = styled.p`
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.6rem;
  text-align: center;
  margin: ${props => props.theme.sizes.sm} 0 0;
  position: relative;
  z-index: 102;
`;

const Spacebar = styled.span`
  position: relative;
  display: inline-block;
  border-radius: 0.3rem;
  margin: 0 ${props => props.theme.sizes.xxs};
  border: 2px solid ${props => props.theme.colors.subtleFg};
  height: 1rem;
  width: 4rem;
`;

export default Activation;
