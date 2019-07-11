import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import faExternalLink from '@fortawesome/fontawesome-pro-regular/faExternalLink';

import Tile from '../shared/Tile';
import LastLayerPreview from '../cube/LastLayerPreview';
import * as CustomPropTypes from '../../propTypes';
import { getSize, getColor, getBreakpoint } from '../../helpers/theme';
import Section from '../shared/Section';
import ToggleContent from '../shared/ToggleContent';
import Modal from '../shared/Modal';

const TrainerCase = ({ trainingCase, selectCase, deselectCase }) => (
  <Tile
    key={trainingCase.id}
    selected={trainingCase.selected}
    onClick={() =>
      trainingCase.selected ? deselectCase(trainingCase.id) : selectCase(trainingCase.id)
    }
  >
    <Section margin="xs">
      <LastLayerPreview previewString={trainingCase.preview} />
    </Section>
    <Section>
      <CaseName>
        <strong>{trainingCase.name}</strong>
        <CaseId> - #{trainingCase.id}</CaseId>
      </CaseName>
    </Section>
    <ToggleContent
      toggle={({ show }) => (
        <Link
          href="#"
          onClick={event => {
            event.stopPropagation();
            show();
          }}
        >
          Show info
        </Link>
      )}
      content={({ hide }) => (
        <Modal onClose={hide} title={trainingCase.name + ' - #' + trainingCase.id}>
          <CaseDetails>
            <Section margin="sm">
              <LastLayerPreview previewString={trainingCase.preview} />
            </Section>
            <div>
              <Section margin="sm">
                {trainingCase.algs.map((alg, i) => (
                  <Section margin="xxs" key={i}>
                    {i === 0 ? <strong>{alg}</strong> : alg}
                  </Section>
                ))}
              </Section>
              <Section margin="sm">
                <Probability>Probability: 1 / {1 / trainingCase.probability}</Probability>
              </Section>
              <Section margin="sm">
                <Link
                  href={'http://algdb.net/puzzle/333/oll/oll' + trainingCase.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesome icon={faExternalLink} /> View on AlgDb.net
                </Link>
              </Section>
            </div>
          </CaseDetails>
        </Modal>
      )}
    />
  </Tile>
);

TrainerCase.propTypes = {
  trainingCase: CustomPropTypes.Case.isRequired,
  selectCase: PropTypes.func.isRequired,
  deselectCase: PropTypes.func.isRequired
};

const Probability = styled.div`
  color: ${getColor('subtleFg')};
`;

const CaseDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: ${getSize('sm')};

  @media screen and (min-width: ${getBreakpoint('sm')}) {
    grid-template-columns: 1fr 3fr;
    grid-column-gap: ${getSize('md')};
  }
`;

const CaseName = styled.span`
  margin: 0;
  font-size: 1.4rem;
`;

const CaseId = styled.span`
  color: ${getColor('subtleFg')};
`;

const Link = styled.a`
  margin: ${getSize('xs')} 0 0;
  font-size: 1.4rem;
  color: ${getColor('blue')};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default React.memo(TrainerCase);
