import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "../shared/Message";

export const NewVersionPrompt = ({
  dismissNewVersion,
  shouldPromptNewVersion,
  reload,
}) =>
  shouldPromptNewVersion ? (
    <Message
      message={
        <>
          A new version is available,{" "}
          <ReloadButton onClick={reload}>reload now</ReloadButton>?
        </>
      }
      dismiss={dismissNewVersion}
    />
  ) : null;

NewVersionPrompt.propTypes = {
  shouldPromptNewVersion: PropTypes.bool,
  reload: PropTypes.func.isRequired,
  dismissNewVersion: PropTypes.func.isRequired,
};

const ReloadButton = styled.span`
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
`;

export default NewVersionPrompt;
