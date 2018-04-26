import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Selector from '../shared/Selector';
import { ARCHIVE_SORT_OPTIONS } from '../../constants/app';
import puzzles from '../../constants/puzzles';

const puzzleSortOptions = [
  { label: 'all', value: '' },
  ...puzzles.map(({ name }) => ({ label: name, value: name }))
];

const ArchiveRefinement = ({ filterArchive, puzzle, sortBy, sortArchive }) => (
  <RefinementBar>
    <RefinementItem>
      <Selector label="Puzzle" onChange={filterArchive} value={puzzle} options={puzzleSortOptions} />
    </RefinementItem>
    <RefinementItem>
      <Selector label="Sort by" onChange={sortArchive} value={sortBy} options={ARCHIVE_SORT_OPTIONS} />
    </RefinementItem>
  </RefinementBar>
);

ArchiveRefinement.propTypes = {
  filterArchive: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  sortArchive: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};

const RefinementBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: -${props => props.theme.sizes.xs};
`;

const RefinementItem = styled.div`
  margin-bottom: ${props => props.theme.sizes.xs};
`;

export default ArchiveRefinement;
