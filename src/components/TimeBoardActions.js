import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import Modal from './Modal';
import Section from './Section';

const TimeBoardActions = ({
    clearTimes,
    closeSaveTimesModal,
    isModalOpen,
    openSaveTimesModal,
    saveTimes
}) => {
  let titleInputEl;

  const onSubmit = event => {
    event.preventDefault();

    const title = titleInputEl.value;

    if (title && title.trim().length > 0) {
      saveTimes(title);
    }
  }

  return (
    <ButtonDuo>
      <ButtonDuoItem>
        <Button onClick={openSaveTimesModal}>Save</Button>
        <Modal isOpen={isModalOpen} title="Save times">
          <form onSubmit={onSubmit}>
            <Section>
              <TitleInput placeholder="Title" type="text" innerRef={el => titleInputEl = el}/>
            </Section>

            <ButtonDuo>
              <ButtonDuoItem>
                <Button type="submit">Save</Button>
              </ButtonDuoItem>
              <ButtonDuoItem>
                <Button danger type="button" onClick={closeSaveTimesModal}>Cancel</Button>
              </ButtonDuoItem>
            </ButtonDuo>
          </form>
        </Modal>
      </ButtonDuoItem>
      <ButtonDuoItem>
        <Button danger onClick={clearTimes}>Clear</Button>
      </ButtonDuoItem>
    </ButtonDuo>
  );
};

TimeBoardActions.propTypes = {
  clearTimes: PropTypes.func.isRequired,
  closeSaveTimesModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  openSaveTimesModal: PropTypes.func.isRequired,
  saveTimes: PropTypes.func.isRequired
}

const ButtonDuo = styled.div`
  display: flex;
`;

const ButtonDuoItem = styled.div`
  flex-grow: 1;
  margin-right: ${props => props.theme.sizes.xs};

  &:last-child {
    margin-right: 0;
  }
`;

const TitleInput = styled.input`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.subtleBg};
  font-size: 1.6rem;
  width: 100%;
  border-radius: 0.3rem;
  padding: ${props => props.theme.sizes.xs};
`;

export default TimeBoardActions;
