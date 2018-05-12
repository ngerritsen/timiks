import React from 'react';
import PropTypes from 'prop-types';
import InlineFontawesome from '../shared/InlineFontawesome';
import { faUpload } from '@fortawesome/fontawesome-pro-solid';

import ModalContainer from '../../containers/shared/ModalContainer';
import Button from '../shared/Button';
import CodeTextarea from '../shared/CodeTextarea';
import Section from '../shared/Section';

const ArchiveImport = ({ importInput, importArchive, changeImportInput, isValid }) => (
  <ModalContainer
    title="Import archive"
    id="importArchive"
    toggle={openModal => (
      <Button tiny tag onClick={openModal}>
        <InlineFontawesome icon={faUpload}/>Import
      </Button>
    )}
    content={() => (
      <div>
        <p>
          Paste your previously exported archive in the text area. This import is <strong>merged</strong> with the existing archive, archive items with the same id will be overwritten.
        </p>
        <Section margin="sm">
          <CodeTextarea value={importInput} onInput={e => changeImportInput(e.target.value)}></CodeTextarea>
        </Section>
        <Button
          disabled={!isValid}
          onClick={() => isValid ? importArchive() : null}
        >Import</Button>
      </div>
    )}
  />
);

ArchiveImport.propTypes = {
  importInput: PropTypes.string.isRequired,
  importArchive: PropTypes.func.isRequired,
  changeImportInput: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired
}

export default ArchiveImport;
