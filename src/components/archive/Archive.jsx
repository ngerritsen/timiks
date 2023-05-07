import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";

import * as CustomPropTypes from "../../propTypes";
import Section from "../shared/Section";
import { formatLocalDate } from "../../helpers/dateTime";
import { getColor, getSize } from "../../helpers/theme";
import ArchiveItem from "./ArchiveItem";
import { getPuzzle } from "../../helpers/puzzle";
import { ARCHIVE_DAYS_OPTIONS } from "../../constants/settings";
import { decapitalize } from "../../helpers/formatting";
import Stats from "./Stats";
import SectionTitle from "../shared/SectionTitle";
import Tiles from "../shared/Tiles";
import Button from "../shared/Button";
import Tag from "../shared/Tag";
import ArchiveTimeGraph from "./ArchiveTimeGraph";
import ArchiveOptions from "./ArchiveOptions";

const Archive = ({
  times,
  stats,
  days,
  puzzle,
  removeTime,
  timesPerDay,
  requireTimes,
}) => {
  useEffect(() => {
    requireTimes(false, puzzle, days);
  }, [puzzle, days]);

  const [showLastStats, setShowLastStats] = useState(false);
  const [expandedDays, setExpandedDays] = useState([0, 1, 2]);
  const expandDay = (index) => setExpandedDays([...expandedDays, index]);
  const collapseDay = (index) =>
    setExpandedDays(expandedDays.filter((i) => i !== index));

  return (
    <>
      {times.length > 1 && (
        <Section margin="md">
          <ArchiveTimeGraph />
        </Section>
      )}
      <Section margin="lg">
        <ArchiveOptions />
      </Section>
      {times.length === 0 && (
        <Message>
          No {getPuzzle(puzzle).title} solves in the{" "}
          {decapitalize(
            ARCHIVE_DAYS_OPTIONS.find((option) => option.value === days).label
          )}
          .
        </Message>
      )}
      {stats.length > 0 && (
        <Section margin="lg">
          <SectionTitle>{showLastStats ? "Last" : "Top"} stats</SectionTitle>
          <Section margin="sm">
            <Stats
              solves={times.length}
              stats={stats}
              showLast={showLastStats}
            />
          </Section>
          <Section margin="sm">
            <Button
              size="sm"
              tag
              color="subtleBg"
              onClick={() => setShowLastStats(!showLastStats)}
            >
              Show {showLastStats ? "top" : "last"} stats
            </Button>
          </Section>
        </Section>
      )}
      {timesPerDay.map(({ date, times }, index) => {
        const expanded = expandedDays.includes(index);
        return (
          <Section margin="md" key={date.toISOString()}>
            <SectionTitleClickable
              onClick={() => (expanded ? collapseDay(index) : expandDay(index))}
            >
              <SectionTitleTitle>{formatLocalDate(date)}</SectionTitleTitle>
              <SectionTitleTag>
                <Tag size="sm">{times.length}</Tag>
              </SectionTitleTag>
              <FontAwesomeIcon icon={expanded ? faCaretDown : faCaretRight} />
            </SectionTitleClickable>
            {expanded && (
              <Tiles>
                {times.map((time) => (
                  <ArchiveItem
                    key={time.id}
                    time={time}
                    removeTime={removeTime}
                  />
                ))}
              </Tiles>
            )}
          </Section>
        );
      })}
    </>
  );
};

Archive.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  timesPerDay: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
    })
  ).isRequired,
  requireTimes: PropTypes.func.isRequired,
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired,
  puzzle: PropTypes.string.isRequired,
  days: PropTypes.number.isRequired,
  removeTime: PropTypes.func.isRequired,
  fixGraphYAxis: PropTypes.bool,
};

const SectionTitleClickable = styled(SectionTitle)`
  cursor: pointer;
  opacity: 0.8;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`;

const SectionTitleTitle = styled.span`
  margin-right: ${getSize("sm")};
`;

const SectionTitleTag = styled.span`
  flex-grow: 1;
  position: relative;
  top: -1px;
`;

const Message = styled.p`
  color: ${getColor("grey")};
  font-weight: bold;
  padding: 15vh 0;
  text-align: center;
`;

export default Archive;
