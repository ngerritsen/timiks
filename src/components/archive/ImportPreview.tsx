import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";

import { Table, Cell, HeadingCell } from "../shared/Table";
import Time from "../shared/Time";
import Tag from "../shared/Tag";
import ToggleContent from "../shared/ToggleContent";
import TimeDetails from "../shared/TimeDetails";
import IconButton from "../shared/IconButton";
import Modal from "../shared/Modal";
import { formatLocalDateTime } from "../../helpers/dateTime";
import { Time as TimeType } from "../../types";

type ImportPreviewProps = {
  times: TimeType[];
  puzzle: string;
};

const ImportPreview = ({ times, puzzle }: ImportPreviewProps) => (
  <Table>
    <thead>
      <tr>
        <HeadingCell col-span="3">
          Times to be imported &nbsp;{" "}
          <Tag size="sm">{String(times.length)}</Tag>
        </HeadingCell>
      </tr>
    </thead>
    <tbody>
      {times.map((time) => (
        <tr key={time.id}>
          <Cell>
            <strong>
              <Time time={time} />
            </strong>
          </Cell>
          <Cell>{formatLocalDateTime(time.date)}</Cell>
          <Cell>
            <ToggleContent
              toggle={({ show }) => (
                <IconButton color="blue" onClick={show}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </IconButton>
              )}
              content={({ hide }) => (
                <Modal title="Details" onClose={hide}>
                  <TimeDetails time={{ ...time, puzzle }} onClose={hide} />
                </Modal>
              )}
            />
          </Cell>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ImportPreview;
