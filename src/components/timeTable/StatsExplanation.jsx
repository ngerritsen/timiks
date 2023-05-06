import React from "react";
import stats, {
  STANDARD_DEVIATION,
  AVERAGE,
  MEAN,
} from "../../constants/stats";
import { Table, Cell } from "../shared/Table";
import { calculateTrim } from "../../helpers/stats";

const StatsExplanation = () => (
  <>
    <p>
      Stats are show if there are enough solves to calculate them. DNF&apos;s
      are excluded in the mean and standard deviation. A trim percentage of 5%
      is used to exclude the best and worst solves from the averages.
    </p>
    <Table>
      <tbody>
        {stats.map((stat) => {
          switch (stat.type) {
            case AVERAGE:
              return (
                <tr key={stat.name}>
                  <Cell bold width="6rem">
                    {stat.name}
                  </Cell>
                  <Cell>
                    Average of {stat.size} excluding the best and worst
                    {calculateTrim(stat.size) === 1
                      ? " solve"
                      : ` ${calculateTrim(stat.size)} solves`}
                    .
                  </Cell>
                </tr>
              );
            case MEAN:
              return stat.size ? (
                <tr key={stat.name}>
                  <Cell bold width="6rem">
                    {stat.name}
                  </Cell>
                  <Cell>Mean (average) of {stat.size} consecutive solves.</Cell>
                </tr>
              ) : (
                <tr key={stat.name}>
                  <Cell bold width="6rem">
                    {stat.name}
                  </Cell>
                  <Cell>Mean (average) of all solves.</Cell>
                </tr>
              );
            case STANDARD_DEVIATION:
              return (
                <tr key={stat.name}>
                  <Cell bold width="6rem">
                    {stat.name}
                  </Cell>
                  <Cell>
                    <a
                      href="https://www.mathsisfun.com/data/standard-deviation.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Standard deviation
                    </a>
                    &nbsp;of all solves, the lower the more consistent.
                  </Cell>
                </tr>
              );
          }
        })}
      </tbody>
    </Table>
  </>
);

export default StatsExplanation;
