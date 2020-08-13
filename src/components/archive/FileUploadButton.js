import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';

import { readFile } from '../../helpers/file';
import { ButtonIcon, LabelButton } from '../shared/Button';
import { getColor, getSize } from '../../helpers/theme';

const FileUploadButton = ({ label, name, onChange, accept }) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);

  const fileInput = useRef(null);

  function onChangeFile() {
    const [file] = fileInput.current.files;

    if (!file) return;

    setCurrentFile(file);
    setLoadingFile(true);

    readFile(file)
      .then(data => onChange({ file, data }))
      .catch(err => {
        console.error(err); // eslint-disable-line no-console
        onChange({ file, data: [] });
      })
      .then(() => setLoadingFile(false));
  }

  return (
    <>
      <input
        ref={fileInput}
        onChange={onChangeFile}
        type="file"
        id={name}
        name={name}
        accept={accept}
        style={{ display: 'none' }}
      />
      <LabelButton htmlFor={name} color="subtleBg">
        <ButtonIcon>
          <FontAwesomeIcon icon={faFolderOpen} />
        </ButtonIcon>
        {label}
      </LabelButton>
      {currentFile && (
        <FileName>
          <FontAwesomeIcon icon={loadingFile ? faCircleNotch : faFile} spin={loadingFile} />
          &nbsp; {currentFile.name}
        </FileName>
      )}
    </>
  );
};

FileUploadButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

const FileName = styled.div`
  border: 1px solid ${getColor('subtleBg')};
  padding: ${getSize('xs')} ${getSize('sm')};
  text-align: center;
  color: ${getColor('subtleFg')};
  margin-top: ${getSize('xs')};
  border-radius: 0.3rem;
`;

export default FileUploadButton;
