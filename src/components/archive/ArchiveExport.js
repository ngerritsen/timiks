import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/fontawesome-pro-solid';

import ModalContainer from '../../containers/ModalContainer';
import IconButton from '../shared/IconButton';
import CodeTextarea from '../shared/CodeTextarea';
import LinkButton from '../shared/LinkButton';
import Section from '../shared/Section';

const ArchiveExport = ({ exportData }) => (
  <ModalContainer
    title="Export archive"
    id="exportArchive"
    toggle={openModal => (
      <IconButton onClick={openModal} color="blue">
        <FontAwesome icon={faDownload}/>
      </IconButton>
    )}
    content={() => (
      <div>
        <p>
          Click download or copy the following code and keep it somewhere safe.
        </p>
        <Section margin="sm">
          <CodeTextarea readOnly value={exportData}></CodeTextarea>
        </Section>
        <LinkButton
          href={'data:text/plain;charset=utf-8,' + encodeURIComponent(exportData)}
          download={`timiks-archive-export-${new Date().toISOString()}.json`}
        >Download</LinkButton>
      </div>
    )}
  />
);

ArchiveExport.propTypes = {
  exportData: PropTypes.string.isRequired
}

export default ArchiveExport;
