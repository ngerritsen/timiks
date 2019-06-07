import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FullScreenMask from './FullScreenMask';
import PrepartionCircles from './PreparationCircles';
import Button from '../shared/Button';

const Activation = ({
  inspecting,
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
      big
      primary
      {...(useManualTimeEntry ? {} : { 'data-activation': true })}
      disabled={useManualTimeEntry && !validTimeInput}
      type="button"
      onClick={() => useManualTimeEntry && validTimeInput && submitTimeInput()}
    >
      {(() => {
        switch (true) {
          case useManualTimeEntry:
            return 'Submit';
          case !stopped:
            return 'Stop';
          case preparingForInspection:
            return 'Ready';
          case preparing || ready:
            return <PrepartionCircles preparationStage={preparationStage} />;
          default:
            return 'Start' + (useInspectionTime && !inspecting ? ' inspection' : '');
        }
      })()}
    </Button>

    <Explain>
      {(() => {
        switch (true) {
          case useManualTimeEntry:
            return 'Enter a time and press enter or click submit.';
          case preparingForInspection:
            return 'Release to start inspection.';
          case preparing && ready:
            return 'Release to start!';
          case preparing && !ready:
            return 'Hold on...';
          case !stopped:
            return (
              <>
                <DesktopOnly>Click, touch or smash any key to stop</DesktopOnly>
                <MobileOnly>Touch anywhere to stop.</MobileOnly>
              </>
            );
          default:
            return (
              <>
                <DesktopOnly>Click, touch or hold spacebar and release to start</DesktopOnly>
                <MobileOnly>Hold and release to start</MobileOnly>
                {useInspectionTime ? ' inspection.' : '.'}
              </>
            );
        }
      })()}
    </Explain>

    {(!stopped || preparing || preparingForInspection || inspecting) && <FullScreenMask />}
  </ActivationContainer>
);

Activation.propTypes = {
  inspecting: PropTypes.bool.isRequired,
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

const DesktopOnly = styled.span`
  display: none;

  @media screen and (min-width: 620px) {
    display: inline;
  }
`;

const MobileOnly = styled.span`
  @media screen and (min-width: 720px) {
    display: none;
  }
`;

const ActivationContainer = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
`;

const Explain = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.subtleFg};
  text-align: center;
  margin: ${props => props.theme.sizes.sm} 0 0;
  position: relative;
  top: -${props => props.theme.sizes.xxs};
  z-index: 102;
`;

export default React.memo(Activation);
