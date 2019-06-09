import React from 'react';

import Showcase from './promotional/Showcase';
import Donate from './promotional/Donate';
import { ButtonDuo, ButtonDuoItem } from './shared/ButtonDuo';

const Footer = () => (
  <ButtonDuo center>
    <ButtonDuoItem center>
      <Showcase />
    </ButtonDuoItem>
    <ButtonDuoItem center>
      <Donate />
    </ButtonDuoItem>
  </ButtonDuo>
);

export default Footer;
