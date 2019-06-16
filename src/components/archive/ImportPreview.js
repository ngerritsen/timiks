import React from 'react';
import PropTypes from 'prop-types';

import * as CustomPropTypes from '../../propTypes';
import { Table, Cell, HeadingCell } from '../shared/Table';
import Time from '../shared/Time';
import Tag from '../shared/Tag';
import { formatLocalDateTime } from '../../helpers/dateTime';

const ImportPreview = ({ times }) => (
  <Table>
    <thead>
      <tr>
        <HeadingCell colSpan="2">
          Times to be imported &nbsp; <Tag size="sm">{times.length}</Tag>
        </HeadingCell>
      </tr>
    </thead>
    <tbody>
      {times.map(time => (
        <tr key={time.id}>
          <Cell>
            <Time time={time} />
          </Cell>
          <Cell>{formatLocalDateTime(time.date)}</Cell>
        </tr>
      ))}
    </tbody>
  </Table>
);

ImportPreview.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired
};

export default ImportPreview;
