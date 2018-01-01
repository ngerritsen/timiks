import React from 'react';
import PropTypes from 'prop-types';
import Selector from './Selector';

import { ARCHIVE_SORT_OPTIONS } from '../constants/app';

const ArchiveRefinement = ({ sortBy, sortArchive }) => (
  <Selector label="Sort by" onChange={sortArchive} value={sortBy} options={ARCHIVE_SORT_OPTIONS} />
);

ArchiveRefinement.propTypes = {
  sortArchive: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};

export default ArchiveRefinement;
