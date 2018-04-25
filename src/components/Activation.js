import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FullScreenMask from './FullScreenMask';
import { PREPARATION_STAGES } from '../constants/app';
import { generateArr } from '../helpers/general';
import Button from './Button';

const Activation = ({
  stopped,
  preparationStage,
  preparing,
  ready,
  preparingForInspection,
  inspectionMode,
  useInspectionTime
}) => {
  return (
    <div>
      <ActivationContainer {...(stopped ? {} : { 'data-stop': true })}>
        <Button big primary data-activation>
          {(() => {
            if (!stopped) {
              return 'Stop';
            }

            if (preparingForInspection) {
              return 'Ready';
            }

            if (preparing || ready) {
              return generateArr(PREPARATION_STAGES)
                .map(index =>
                  <PrepartionCircle key={index} active={index < preparationStage} />
                );
            }

            if (useInspectionTime && !inspectionMode) {
              return 'Start inspection';
            }

            return 'Start';
          })()}
        </Button>

        <Explain>
          {(() => {
            if (preparingForInspection) {
              return 'Release to start inspection';
            }

            if ((preparing && ready)) {
              return 'Release to start!';
            }

            if (preparing && !ready) {
              return 'Hold on...';
            }

            if (!stopped) {
              return <span>Click, tap or smash <Spacebar/> spacebar to stop</span>;
            }

            if (!preparing && !ready) {
              return <span>Click, touch or press <Spacebar/> spacebar. Hold and release to start{useInspectionTime ? ' inspection' : ''}</span>;
            }
          })()}
        </Explain>
      </ActivationContainer>

      {(!stopped || preparing || preparingForInspection || inspectionMode) && <FullScreenMask/>}
    </div>
  )
};

Activation.propTypes = {
  stopped: PropTypes.bool.isRequired,
  preparationStage: PropTypes.number.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  preparing: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  inspectionMode: PropTypes.bool.isRequired
};

const ActivationContainer = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
`;

const PrepartionCircle = styled.span`
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.6rem;
  line-height: 1.6rem;
  background-color: white;
  opacity: ${props => props.active ? 1 : 0.3};
  margin: 0 ${props => props.theme.sizes.sm};
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
