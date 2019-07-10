import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Section from '../shared/Section';
import Scramble from '../scramble/Scramble';
import TimerContainer from '../../containers/timer/TimerContainer';
import ActivationContainer from '../../containers/timer/ActivationContainer';
import { DEFAULT_PUZZLE } from '../../constants/settings';
import * as CustomPropTypes from '../../propTypes';
import SectionTitle from '../shared/SectionTitle';
import Tile from '../shared/Tile';
import Tiles from '../shared/Tiles';

import { getSize } from '../../helpers/theme';
import LastLayerPreview from '../cube/LastLayerPreview';
import Checkbox from '../shared/Checkbox';

const Trainer = ({
  scramble,
  groupedCases,
  selectCase,
  deselectCase,
  selectCases,
  deselectCases
}) => (
  <div>
    <Section margin="lg">
      <TimerContainer showFinalTime />
    </Section>
    <Section margin="sm">
      <Scramble scramble={scramble} puzzle={DEFAULT_PUZZLE} />
    </Section>
    <Section margin="md">
      <ActivationContainer />
    </Section>
    <Section margin="md">
      Select the OLL cases you want to train. Selecting nothing will be the same as everything.
    </Section>
    {groupedCases.map(group => {
      const allSelected = group.cases.every(c => c.selected);
      return (
        <Section margin="md" key={group.prefix}>
          <SectionTitle>
            {group.name}
            &nbsp; &nbsp;
            <SelectAllLabel
              onClick={() =>
                (allSelected ? deselectCases : selectCases)(group.cases.map(c => c.id))
              }
            >
              <SelectAllCheckBox>
                <Checkbox name={group.prefix} checked={allSelected} onChange={() => {}} />
              </SelectAllCheckBox>
              Select all
            </SelectAllLabel>
          </SectionTitle>
          <Tiles>
            {group.cases.map(c => (
              <Tile
                key={c.id}
                selected={c.selected}
                onClick={() => (c.selected ? deselectCase(c.id) : selectCase(c.id))}
              >
                <LastLayerPreview previewString={c.preview} />
                {c.name}
              </Tile>
            ))}
          </Tiles>
        </Section>
      );
    })}
  </div>
);

Trainer.propTypes = {
  scramble: CustomPropTypes.Scramble.isRequired,
  groupedCases: PropTypes.arrayOf(CustomPropTypes.CaseGroup).isRequired,
  selectCase: PropTypes.func.isRequired,
  deselectCase: PropTypes.func.isRequired,
  selectCases: PropTypes.func.isRequired,
  deselectCases: PropTypes.func.isRequired
};

const SelectAllLabel = styled.label`
  position: relative;
  font-size: 1.6rem;
  display: inline-block;
  font-weight: normal;
  align-items: center;
  cursor: pointer;
`;

const SelectAllCheckBox = styled.span`
  position: relative;
  margin-right: ${getSize('xxs')};
  top: 0.2rem;
`;

export default Trainer;
