import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FullScreenMask from './FullScreenMask';
import { PREPARATION_STAGES } from '../constants/app';
import { generateArr } from '../helpers/general';
import Button from './Button';

const Activation = ({ stopped, preparationStage, preparing, ready }) => {
  return (
    <div>
      <Button big primary data-activation>
        {stopped && !(preparing || ready) && 'Start'}
        {preparing && generateArr(PREPARATION_STAGES)
          .map(index =>
            <PrepartionCircle key={index} active={index < preparationStage} />
          )
        }
        {!stopped && 'Stop'}
      </Button>

      <Explain>
        {(() => {
          if (preparing && ready) {
            return 'Release to start!'
          }

          if (preparing && !ready) {
            return 'Hold on...'
          }

          if (!stopped) {
            return <span>Click, tap or smash <Spacebar/> spacebar to stop</span>
          }

          if (!preparing && !ready) {
            return <span>Click, touch or press <Spacebar/> spacebar. Hold and release to start</span>
          }
        })()}
      </Explain>

      {!stopped && <FullScreenMask/>}
    </div>
  )
};

Activation.propTypes = {
  stopped: PropTypes.bool.isRequired,
  preparationStage: PropTypes.number.isRequired,
  preparing: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired
};

const PrepartionCircle = styled.span`
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.6rem;
  line-height: 1.6rem;
  background-color: white;
  opacity: ${props => props.active ? 1 : 0.3};
  margin-right: ${props => props.theme.sizes.md};
`;

const Explain = styled.p`
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.6rem;
  text-align: center;
  margin: ${props => props.theme.sizes.sm} 0 0;
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
