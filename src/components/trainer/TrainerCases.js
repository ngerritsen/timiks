import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SectionTitle from '../shared/SectionTitle';
import Tiles from '../shared/Tiles';
import { getSize } from '../../helpers/theme';
import Checkbox from '../shared/Checkbox';
import * as CustomPropTypes from '../../propTypes';
import TrainerCase from './TrainerCase';
import Section from '../shared/Section';

const TrainerCases = ({
  groupedCases,
  selectCase,
  deselectCase,
  selectCases,
  deselectCases,
  trainingType
}) =>
  groupedCases.map(category => {
    const allSelected = category.cases.every(c => c.selected);

    return (
      <Section margin="md" key={category.id}>
        <SectionTitle>
          {category.name}
          &nbsp; &nbsp;
          <SelectAllLabel
            onClick={() =>
              (allSelected ? deselectCases : selectCases)(category.cases.map(c => c.id))
            }
          >
            <SelectAllCheckBox>
              <Checkbox name={category.id} checked={allSelected} onChange={() => {}} />
            </SelectAllCheckBox>
            Select all
          </SelectAllLabel>
        </SectionTitle>
        <Tiles>
          {category.cases.map(trainingCase => (
            <TrainerCase
              selectCase={selectCase}
              deselectCase={deselectCase}
              trainingCase={trainingCase}
              key={trainingCase.id}
              trainingType={trainingType}
            />
          ))}
        </Tiles>
      </Section>
    );
  });

TrainerCases.propTypes = {
  groupedCases: PropTypes.arrayOf(CustomPropTypes.CaseCategory).isRequired,
  selectCase: PropTypes.func.isRequired,
  deselectCase: PropTypes.func.isRequired,
  selectCases: PropTypes.func.isRequired,
  deselectCases: PropTypes.func.isRequired,
  trainingType: PropTypes.string.isRequired
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

export default React.memo(TrainerCases);
