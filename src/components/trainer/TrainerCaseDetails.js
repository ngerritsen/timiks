import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";

import LastLayerPreview from "../cube/LastLayerPreview";
import * as CustomPropTypes from "../../propTypes";
import { getSize, getColor, getBreakpoint } from "../../helpers/theme";
import Section from "../shared/Section";
import { buildAlgDbUrl } from "../../helpers/trainer";
import Link from "../shared/Link";

const TrainerCaseDetails = ({ trainingCase, trainingType }) => (
  <CaseDetails>
    <Section margin="sm">
      <LastLayerPreview
        previewString={trainingCase.preview}
        previewArrows={trainingCase.previewArrows}
      />
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
        <Probability>
          Probability: 1 / {1 / trainingCase.probability}
        </Probability>
      </Section>
      <Section margin="sm">
        <Link
          href={buildAlgDbUrl(trainingType, trainingCase.id)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon size="sm" icon={faExternalLinkAlt} /> View on
          AlgDb.net
        </Link>
      </Section>
    </div>
  </CaseDetails>
);

const Probability = styled.div`
  color: ${getColor("subtleFg")};
`;

const CaseDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: ${getSize("sm")};

  @media screen and (min-width: ${getBreakpoint("sm")}) {
    grid-template-columns: 1fr 3fr;
    grid-column-gap: ${getSize("md")};
  }
`;

TrainerCaseDetails.propTypes = {
  trainingCase: CustomPropTypes.Case.isRequired,
  trainingType: PropTypes.string.isRequired,
};

export default TrainerCaseDetails;
