import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-pro-solid/faTrashAlt';

import * as CustomPropTypes from '../../propTypes';
import { Table, Cell, HeadingCell } from '../shared/Table';
import Time from '../shared/Time';
import Section from '../shared/Section';
import { getColor, getSize } from '../../helpers/theme';
import Button, { ButtonIcon } from '../shared/Button';
import LastLayerPreview from '../cube/LastLayerPreview';
import styled from 'styled-components';
import ToggleContent from '../shared/ToggleContent';
import Modal from '../shared/Modal';
import TrainerCaseDetails from './TrainerCaseDetails';
import { buildFullCaseTitle } from '../../helpers/trainer';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import Shortcut from '../shared/Shortcut';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';

const TrainerTimeTable = ({ cases, clearTrainerTimes, trainingType }) =>
  cases.length > 0 && (
    <>
      <Section margin="sm">
        <Table>
          <thead>
            <tr>
              <HeadingCell width="9rem">Case</HeadingCell>
              <HeadingCell width="6rem">Mean</HeadingCell>
              <HeadingCell>Times</HeadingCell>
            </tr>
          </thead>
          <tbody>
            {cases.map(trainingCase => (
              <tr key={trainingCase.id}>
                <ToggleContent
                  toggle={({ show }) => (
                    <CaseCell color="subtleFg" width="9rem" onClick={show}>
                      <PreviewWrapper>
                        <LastLayerPreview
                          previewString={trainingCase.preview}
                          previewArrows={trainingCase.previewArrows}
                        />
                      </PreviewWrapper>
                      &nbsp;
                      {trainingCase.name}
                    </CaseCell>
                  )}
                  content={({ hide }) => (
                    <Modal onClose={hide} title={buildFullCaseTitle(trainingCase, trainingType)}>
                      <TrainerCaseDetails trainingCase={trainingCase} trainingType={trainingType} />
                    </Modal>
                  )}
                />
                <Cell bold width="6rem">
                  <Time time={{ ms: trainingCase.mean }} />
                </Cell>
                <TimesCell>
                  {trainingCase.times.map((time, i) => (
                    <span key={i}>
                      {i > 0 && <span>, &nbsp;&nbsp;</span>}
                      <Time time={time} />
                    </span>
                  ))}
                </TimesCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      {cases.length > 0 && (
        <Section>
          <Toolbar>
            <ToolbarItem>
              <ToggleContent
                toggle={({ toggle }) => (
                  <Button size="sm" color="red" tag onClick={toggle}>
                    <Shortcut command="clearTimes" action={toggle} />
                    <ButtonIcon>
                      <FontAwesome icon={faTrashAlt} />
                    </ButtonIcon>
                    Clear
                  </Button>
                )}
                content={({ hide }) => (
                  <Modal title={`Clear ${trainingType} times`} onClose={hide}>
                    <>
                      <Section margin="md">
                        <p>Are you sure you want to remove the current {trainingType} times?</p>
                      </Section>
                      <ButtonDuo>
                        <ButtonDuoItem>
                          <Button color="subtleFg" outline onClick={hide}>
                            Cancel
                          </Button>
                        </ButtonDuoItem>
                        <ButtonDuoItem>
                          <Button
                            color="red"
                            onClick={() => {
                              hide();
                              clearTrainerTimes();
                            }}
                          >
                            Remove
                          </Button>
                        </ButtonDuoItem>
                      </ButtonDuo>
                    </>
                  </Modal>
                )}
              />
            </ToolbarItem>
          </Toolbar>
        </Section>
      )}
    </>
  );

TrainerTimeTable.propTypes = {
  cases: PropTypes.arrayOf(CustomPropTypes.Case).isRequired,
  clearTrainerTimes: PropTypes.func.isRequired,
  trainingType: PropTypes.string.isRequired
};

const PreviewWrapper = styled.span`
  width: 1.6em;
  height: 1.6em;
  overflow: hidden;
  display: inline-block;
  margin: -${getSize('xs')} ${getSize('xxs')} -${getSize('xs')} 0;
`;

const CaseCell = Cell.extend`
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${getColor('subtleBg')};
  }
`;

const TimesCell = Cell.extend`
  white-space: nowrap;
  overflow-x: auto;
  position: relative;

  &:after {
    content: '';
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    width: ${getSize('lg')};
    background-image: linear-gradient(to right, transparent, ${getColor('bg')});
  }

  padding-right: ${getSize('lg')};

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default TrainerTimeTable;
