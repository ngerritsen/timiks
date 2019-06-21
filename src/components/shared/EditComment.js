import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from './Button';
import { ButtonDuo, ButtonDuoItem } from './ButtonDuo';
import * as CustomPropTypes from '../../propTypes';
import Textarea from './Textarea';
import Modal from './Modal';
import Section from './Section';
import { getColor } from '../../helpers/theme';

const MAX_COMMENT_LENGTH = 256;

const EditComment = ({ time, onCancel, onSave }) => {
  const [comment, setComment] = useState(time.comment || '');
  const valid = comment.length <= MAX_COMMENT_LENGTH;
  const changed = comment !== (time.comment || '');

  return (
    <Modal title="Edit comment" onClose={onCancel}>
      <Section margin={valid ? 'sm' : 'xxs'}>
        <Textarea
          rows="4"
          maxLength={MAX_COMMENT_LENGTH}
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </Section>
      {!valid && (
        <Section margin="sm">
          <ValidationError>
            Comment cannot be longer than {MAX_COMMENT_LENGTH} characters.
          </ValidationError>
        </Section>
      )}
      <ButtonDuo>
        <ButtonDuoItem>
          <Button color="subtleFg" outline onClick={onCancel}>
            Cancel
          </Button>
        </ButtonDuoItem>
        <ButtonDuoItem>
          <Button disabled={!changed || !valid} onClick={() => onSave(comment)}>
            Save
          </Button>
        </ButtonDuoItem>
      </ButtonDuo>
    </Modal>
  );
};

EditComment.propTypes = {
  time: CustomPropTypes.Time,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const ValidationError = styled.div`
  color: ${getColor('red')};
`;

export default EditComment;
