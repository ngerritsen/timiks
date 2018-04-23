import React from 'react';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';

import Section from './Section';

const Footer = () => (
  <Section margin="md">
    <center>
      <FooterMessage href="https://github.com/ngerritsen/timiks/issues" target="_blank">
         <GithubIcon><FontAwesome icon={faGithub} size="md" /></GithubIcon>Report bugs or suggestions.
      </FooterMessage>
    </center>
  </Section>
);

const FooterMessage = styled.a`
  color: ${props => props.theme.colors.subtleFg};
  text-align: center;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.fg};
  }
`;

const GithubIcon = styled.span`
  position: relative;
  top: 0.05rem;
  text-decoration: none;
  margin-right: 0.5em;
`;

export default Footer;
