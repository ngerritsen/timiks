import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import SectionTitle from "../shared/SectionTitle";
import Tiles from "../shared/Tiles";
import { getSize } from "../../helpers/theme";
import Checkbox from "../shared/Checkbox";
import TrainerCase from "./TrainerCase";
import Section from "../shared/Section";
import { selectCases, deselectCases } from "../../actions";
import {
  getGroupedSelectedCases,
  getTrainingType,
} from "../../selectors/trainer";

const TrainerCases = () => {
  const dispatch = useDispatch();
  const groupedCases = useSelector(getGroupedSelectedCases);
  const trainingType = useSelector(getTrainingType);

  return groupedCases.map((category) => {
    const allSelected = category.cases.every((c) => c.selected);
    const caseIds = category.cases.map((c) => c.id);

    return (
      <Section margin="md" key={category.id}>
        <SectionTitle>
          {category.name}
          <SelectAllLabel>
            <Checkbox
              label="Select all"
              name={category.id}
              checked={allSelected}
              onChange={(checked) =>
                dispatch(
                  checked ? selectCases(caseIds) : deselectCases(caseIds)
                )
              }
            />
          </SelectAllLabel>
        </SectionTitle>
        <Tiles>
          {category.cases.map((trainingCase) => (
            <TrainerCase
              trainingCase={trainingCase}
              key={trainingCase.id}
              trainingType={trainingType}
            />
          ))}
        </Tiles>
      </Section>
    );
  });
};

const SelectAllLabel = styled.label`
  font-size: 1.6rem;
  position: relative;
  top: 0.1rem;
  display: inline-block;
  margin-left: ${getSize("sm")};
  font-weight: normal;
`;

export default React.memo(TrainerCases);
