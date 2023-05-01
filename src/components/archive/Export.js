import React from "react";
import PropTypes from "prop-types";

import * as CustomPropTypes from "../../propTypes";
import Button, { ButtonIcon } from "../shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { timesToCsv } from "../../helpers/csv";
import { downloadAsFile } from "../../helpers/file";

const Export = ({ times, puzzle }) => (
  <Button
    size="sm"
    color="subtleBg"
    onClick={() => downloadAsCsv(times, puzzle)}
  >
    <ButtonIcon>
      <FontAwesomeIcon icon={faDownload} />
    </ButtonIcon>
    Export CSV
  </Button>
);

function downloadAsCsv(times, puzzle) {
  const data = timesToCsv(times);
  const filename = `times_${puzzle}_all_${new Date().toISOString()}.csv`;

  downloadAsFile(filename, data, "text/csv");
}

Export.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  puzzle: PropTypes.string.isRequired,
  tag: PropTypes.bool,
};

export default Export;
