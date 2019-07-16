import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tile from '../shared/Tile';
import LastLayerPreview from '../cube/LastLayerPreview';
import * as CustomPropTypes from '../../propTypes';
import { getColor } from '../../helpers/theme';
import Section from '../shared/Section';
import ToggleContent from '../shared/ToggleContent';
import Modal from '../shared/Modal';
import { OLL } from '../../constants/trainer';
import TrainerCaseDetails from './TrainerCaseDetails';
import Link from '../shared/Link';
import { buildFullCaseTitle } from '../../helpers/trainer';

const TrainerCase = ({ trainingCase, selectCase, deselectCase, trainingType }) => (
  <Tile
    key={trainingCase.id}
    selected={trainingCase.selected}
    onClick={() =>
      trainingCase.selected ? deselectCase(trainingCase.id) : selectCase(trainingCase.id)
    }
  >
    <Section margin="xs">
      <LastLayerPreview
        previewString={trainingCase.preview}
        previewArrows={trainingCase.previewArrows}
      />
    </Section>
    <Section>
      <CaseName>
        <strong>{trainingCase.name}</strong>
        {trainingType === OLL && <CaseId> - #{trainingCase.id}</CaseId>}
      </CaseName>
    </Section>
    <ToggleContent
      toggle={({ show }) => (
        <Link
          href="#"
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            show();
          }}
        >
          Show info
        </Link>
      )}
      content={({ hide }) => (
        <Modal onClose={hide} title={buildFullCaseTitle(trainingCase, trainingType)}>
          <TrainerCaseDetails trainingCase={trainingCase} />
        </Modal>
      )}
    />
  </Tile>
);

TrainerCase.propTypes = {
  trainingCase: CustomPropTypes.Case.isRequired,
  selectCase: PropTypes.func.isRequired,
  deselectCase: PropTypes.func.isRequired,
  trainingType: PropTypes.string.isRequired
};

const CaseName = styled.span`
  margin: 0;
  font-size: 1.4rem;
`;

const CaseId = styled.span`
  color: ${getColor('subtleFg')};
`;

export default React.memo(TrainerCase);
