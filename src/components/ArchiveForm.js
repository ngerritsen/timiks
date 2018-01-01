import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import Section from './Section';

const ArchiveForm = ({ archiveCurrentTimes, inputTimesTitle, onCancel, titleInput,  }) => {
  const canSubmit = titleInput.trim().length > 0;
  const onSubmit = event => {
    event.preventDefault();

    if (canSubmit) {
      archiveCurrentTimes(titleInput);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Section margin="md">
        <TitleInput
          value={titleInput}
          placeholder="Title"
          type="text"
          onInput={e => inputTimesTitle(e.target.value)}
        />
      </Section>

      <ButtonDuo>
        <ButtonDuoItem>
          <Button disabled={!canSubmit} type="submit">Archive</Button>
        </ButtonDuoItem>
        <ButtonDuoItem>
          <Button danger type="button" onClick={onCancel}>Cancel</Button>
        </ButtonDuoItem>
      </ButtonDuo>
    </form>
  )
};

ArchiveForm.propTypes = {
  archiveCurrentTimes: PropTypes.func.isRequired,
  inputTimesTitle: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  titleInput: PropTypes.string.isRequired
};


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

export default ArchiveForm;
