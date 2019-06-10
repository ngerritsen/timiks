import React from 'react';
import styled from 'styled-components';

import keymap from '../constants/keymap';
import Section from './shared/Section';

const KeyMap = () => (
  <>
    {keymap
      .filter(mapping => !mapping.hide)
      .map(mapping => (
        <Section margin="sm" key={mapping.key}>
          <KeyContainer>
            <Key>{mapping.key}</Key>
            <span>{mapping.description}</span>
          </KeyContainer>
        </Section>
      ))}
  </>
);

const KeyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Key = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  display: inline-block;
  border-radius: 0.3rem;
  border: 1px solid ${props => props.theme.colors.grey};
  background-color: ${props => props.theme.colors.subtleBg};
  color: ${props => props.theme.colors.subtleFg};
  padding: 0.15rem 0.4rem;
`;

export default KeyMap;
