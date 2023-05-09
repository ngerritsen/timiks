import React from "react";

import Button, { ButtonIcon } from "../shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { timesToCsv } from "../../helpers/csv";
import { downloadAsFile } from "../../helpers/file";
import { Time } from "../../types";

type ExportProps = {
  times: Time[];
  puzzle: string;
};

const Export = ({ times, puzzle }: ExportProps) => (
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

function downloadAsCsv(times: Time[], puzzle: string) {
  const data = timesToCsv(times);
  const filename = `times_${puzzle}_all_${new Date().toISOString()}.csv`;

  downloadAsFile(filename, data, "text/csv");
}

export default Export;
