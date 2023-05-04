import React from "react";
import styled from "styled-components";
import Message from "../shared/Message";
import { useDispatch, useSelector } from "react-redux";
import { shouldPromptNewVersion } from "../../selectors/version";
import { dismissNewVersion } from "../../slices/version";

export const NewVersionPrompt = () => {
  const dispatch = useDispatch();
  const shouldPrompt = useSelector(shouldPromptNewVersion);

  return shouldPrompt ? (
    <Message
      message={
        <>
          A new version is available,{" "}
          <ReloadButton
            onClick={() => {
              window.location.reload();
            }}
          >
            reload now
          </ReloadButton>
          ?
        </>
      }
      dismiss={() => dispatch(dismissNewVersion())}
    />
  ) : null;
};

const ReloadButton = styled.span`
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
`;

export default NewVersionPrompt;
