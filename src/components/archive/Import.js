import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';

import Button, { ButtonIcon } from '../shared/Button';
import ToggleContent from '../shared/ToggleContent';
import Modal from '../shared/Modal';

import Section from '../shared/Section';
import Select from '../shared/Select';
import puzzles from '../../constants/puzzles';
import FileUploadButton from './FileUploadButton';
import ImportPreview from './ImportPreview';
import { addPuzzleToTimes } from '../../helpers/times';
import Warning from '../shared/Warning';
import importSources from '../../constants/importSources';

const puzzleOptions = [
  { label: 'Select a puzzle', value: '' },
  ...puzzles.map(({ name, title }) => ({ label: title, value: name }))
];

const sourceOptions = importSources.map(source => ({ label: source.title, value: source.type }));

const Import = ({ importTimes }) => {
  const [times, setTimes] = useState(null);
  const [sourceType, setSourceType] = useState(sourceOptions[0].value);
  const [puzzle, setPuzzle] = useState(puzzleOptions[0].value);
  const sourceConfig = importSources.find(source => source.type === sourceType);

  return (
    <ToggleContent
      toggle={({ show }) => (
        <Button size="sm" color="subtleBg" onClick={show}>
          <ButtonIcon>
            <FontAwesomeIcon icon={faUpload} />
          </ButtonIcon>
          Import
        </Button>
      )}
      content={({ hide }) => (
        <Modal title="Import" onClose={hide}>
          <Section margin="sm">
            <Select onChange={setSourceType} options={sourceOptions} value={sourceType} />
          </Section>
          <Section margin="md">{sourceConfig.explanation}</Section>
          <Section margin={times ? 'lg' : ''}>
            <FileUploadButton
              onChange={res => setTimes(sourceConfig.func(res.data))}
              name={sourceConfig.type}
              accept={sourceConfig.fileExtension}
              label={'Choose a ' + sourceConfig.title + ' export'}
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
              <ImportPreview times={times} puzzle={puzzle} />
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
