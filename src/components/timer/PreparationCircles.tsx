import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCircle as faEmptyCircle } from "@fortawesome/free-regular-svg-icons/faCircle";

import { PREPARATION_STAGES } from "../../constants/timer";
import { generateArr } from "../../helpers/general";
import { getSize } from "../../helpers/theme";

type PrepartionCirclesProps = {
  preparationStage: number;
};

const PrepartionCircles = ({ preparationStage }: PrepartionCirclesProps) => (
  <>
    {generateArr(PREPARATION_STAGES).map((index) => (
      <PrepartionCircle key={index}>
        <FontAwesomeIcon
          icon={index < preparationStage ? faCircle : faEmptyCircle}
          size="xs"
        />
      </PrepartionCircle>
    ))}
  </>
);

const PrepartionCircle = styled.span`
  margin: 0 ${getSize("sm")};
`;

export default PrepartionCircles;
