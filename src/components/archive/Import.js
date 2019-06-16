import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from '@fortawesome/react-fontawesome';
import faUpload from '@fortawesome/fontawesome-pro-solid/faUpload';

import Button, { ButtonIcon } from '../shared/Button';
import ToggleContent from '../shared/ToggleContent';
import Modal from '../shared/Modal';
import { csTimerSessionToTimes } from '../../helpers/import';

import Section from '../shared/Section';
import Select from '../shared/Select';
import puzzles from '../../constants/puzzles';
import FileUploadButton from './FileUploadButton';
import ImportPreview from './ImportPreview';
import { addPuzzleToTimes } from '../../helpers/times';
import Warning from '../shared/Warning';

const puzzleOptions = [
  { label: 'Select a puzzle', value: '' },
  ...puzzles.map(({ name, title }) => ({ label: title, value: name }))
];

const Import = ({ importTimes }) => {
  const [times, setTimes] = useState(null);
  const [puzzle, setPuzzle] = useState('');

  return (
    <ToggleContent
      toggle={({ show }) => (
        <Button size="sm" color="subtleBg" onClick={show}>
          <ButtonIcon>
            <FontAwesome icon={faUpload} />
          </ButtonIcon>
          Import
        </Button>
      )}
      content={({ hide }) => (
        <Modal title="Import" onClose={hide}>
          <p>Select a file and a puzzle to start the import.</p>
          <Section margin={times ? 'lg' : ''}>
            <FileUploadButton
              onChange={res => setTimes(csTimerSessionToTimes(res.data))}
              name="csTimerSessionFile"
              accept=".csv"
              label="csTimer single session"
            />
          </Section>
          {times && times.length === 0 && <Warning>No valid times found in file.</Warning>}
          {times && times.length > 0 && (
            <>
              <Section margin="xs">
                <Select onChange={setPuzzle} options={puzzleOptions} value={puzzle} />
              </Section>
              <Section margin="md">
                <Button
                  disabled={!puzzle}
                  onClick={() => {
                    importTimes(addPuzzleToTimes(times, puzzle));
                    hide();
                  }}
                >
                  Import
                </Button>
              </Section>
              <ImportPreview times={times} />
            </>
          )}
        </Modal>
      )}
    />
  );
};

Import.propTypes = {
  importTimes: PropTypes.func.isRequired
};

export default Import;
