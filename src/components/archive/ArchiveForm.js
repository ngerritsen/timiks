import React from 'react';
import PropTypes from 'prop-types';

import Button from '../shared/Button';
import Input from '../shared/Input';
import Section from '../shared/Section';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';

const ArchiveForm = ({ archiveCurrentTimes, inputTimesTitle, onCancel, titleInput }) => {
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
        <Input
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
          <Button empty fg type="button" onClick={onCancel}>Cancel</Button>
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

export default ArchiveForm;
