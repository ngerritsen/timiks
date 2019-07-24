import PropTypes from 'prop-types';
import React from 'react';

import Tag from '../shared/Tag';

const TrainerStatus = ({
  trainingType,
  enabledCases,
  inRehearsal,
  trainingCases,
  remainingRehearsalCases
}) => (
  <Tag color="subtleBg">
    {!inRehearsal &&
      (() => {
        switch (enabledCases) {
          case 0:
            return `${trainingType} - Training all cases`;
          case 1:
            return `${trainingType} - Training 1 case`;
          default:
            return `${trainingType} - Training ${enabledCases} cases`;
        }
      })()}
    {inRehearsal &&
      `${trainingType} - Rehearsing ${trainingCases -
        remainingRehearsalCases} / ${trainingCases} cases`}
  </Tag>
);

TrainerStatus.propTypes = {
  inRehearsal: PropTypes.bool,
  trainingType: PropTypes.string.isRequired,
  enabledCases: PropTypes.number.isRequired,
  trainingCases: PropTypes.number.isRequired,
  remainingRehearsalCases: PropTypes.number.isRequired
};

export default TrainerStatus;
