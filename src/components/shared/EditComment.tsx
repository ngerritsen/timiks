import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import { ButtonDuo, ButtonDuoItem } from "./ButtonDuo";
import Textarea from "./Textarea";
import Modal from "./Modal";
import Section from "./Section";
import { getColor } from "../../helpers/theme";
import { Time } from "../../types";
import { useDispatch } from "react-redux";
import { updateTime } from "../../slices/times";

const MAX_COMMENT_LENGTH = 256;

type EditCommentProps = {
  time: Time;
  onCancel: () => void;
};

const EditComment = ({ time, onCancel }: EditCommentProps) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(time.comment || "");
  const valid = comment.length <= MAX_COMMENT_LENGTH;
  const changed = comment !== (time.comment || "");
  const onSave = () => {
    dispatch(updateTime({ id: time.id, fields: { comment } }));
    onCancel();
  };

  return (
    <Modal title="Edit comment" onClose={onCancel}>
      <Section margin={valid ? "sm" : "xxs"}>
        <Textarea
          rows={4}
          maxLength={MAX_COMMENT_LENGTH}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
          <Button disabled={!changed || !valid} onClick={onSave}>
            Save
          </Button>
        </ButtonDuoItem>
      </ButtonDuo>
    </Modal>
  );
};

const ValidationError = styled.div`
  color: ${getColor("red")};
`;

export default EditComment;
