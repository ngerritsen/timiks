import React from 'react';
import PropTypes from 'prop-types';
import InlineFontawesome from '../shared/InlineFontawesome';
import { faDownload } from '@fortawesome/fontawesome-pro-solid';

import ModalContainer from '../../containers/shared/ModalContainer';
import Button from '../shared/Button';
import CodeTextarea from '../shared/CodeTextarea';
import LinkButton from '../shared/LinkButton';
import Section from '../shared/Section';

const ArchiveExport = ({ exportData }) => (
  <ModalContainer
    title="Export archive"
    id="exportArchive"
    toggle={openModal => (
      <Button tiny tag onClick={openModal}>
        <InlineFontawesome icon={faDownload}/>Export
      </Button>
    )}
    content={() => (
      <div>
        <p>
          Click download or copy the following code and keep it somewhere safe.
        </p>
        <Section margin="sm">
          <CodeTextarea onChange={e => e.preventDefault()} value={exportData}></CodeTextarea>
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
