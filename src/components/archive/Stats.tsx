import React, { Fragment } from "react";
import styled from "styled-components";

import { getBreakpoint, getSize, getColor } from "../../helpers/theme";
import Time from "../shared/Time";
import { Stat } from "../../types";
import { Color } from "../../theme";

type StatsProps = {
  stats: Stat[];
  solves: number;
  showLast: boolean;
};

type StatColorProps = {
  color: Color;
};

const Stats = ({ stats, solves, showLast }: StatsProps) => (
  <StatsContainer>
    <>
      <StatTitle>
        <StatColor color="subtleFg" />
        solves:
      </StatTitle>
      <strong>{solves}</strong>
    </>
    {stats.map((stat) => (
      <Fragment key={stat.name}>
        <StatTitle>
          <StatColor color={stat.color} />
          {stat.name}:
        </StatTitle>
        <strong>
          <Time time={showLast ? stat.current : stat.best || stat.current} />
        </strong>
      </Fragment>
    ))}
  </StatsContainer>
);

const StatsContainer = styled.div`
  padding: ${getSize("sm")} ${getSize("xxs")};
  border-top: 1px solid ${getColor("subtleBg")};
  border-bottom: 1px solid ${getColor("subtleBg")};
  display: grid;
  grid-column-gap: ${getSize("xs")};
  grid-row-gap: ${getSize("xs")};
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: ${getBreakpoint("sm")}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${getBreakpoint("lg")}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StatTitle = styled.span`
  display: inline-block;
  width: 8rem;
`;

const StatColor = styled.span<StatColorProps>`
  display: inline-block;
  font-weight: bold;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.5rem;
  background-color: ${(props) => getColor(props.color || "grey")(props)};
  margin-right: ${getSize("xs")};
`;

export default Stats;
