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
import { getSize, getBreakpoint } from '../../helpers/theme';
import LastLayerPreview from '../cube/LastLayerPreview';

const Trainer = ({ scramble, groupedCases, selectCase, deselectCase }) => (
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
    {groupedCases.map(group => (
      <Section margin="md" key={group.prefix}>
        <SectionTitle>{group.name}</SectionTitle>
        <Cases>
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
        </Cases>
      </Section>
    ))}
  </div>
);

Trainer.propTypes = {
  scramble: CustomPropTypes.Scramble.isRequired,
  groupedCases: PropTypes.arrayOf(CustomPropTypes.CaseGroup).isRequired,
  selectCase: PropTypes.func.isRequired,
  deselectCase: PropTypes.func.isRequired
};

const Cases = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${getSize('xs')};
  grid-row-gap: ${getSize('xs')};

  @media screen and (min-width: ${getBreakpoint('sm')}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${getBreakpoint('md')}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${getBreakpoint('lg')}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export default Trainer;
