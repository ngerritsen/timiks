import React from 'react';

import { ButtonIcon, LinkButton } from './shared/Button';
import FontAwesome from '@fortawesome/react-fontawesome';
import faDonate from '@fortawesome/fontawesome-pro-solid/faDonate';
import { PAY_PAL_DONATION_LINK } from '../constants/app';

const Donate = () => (
  <LinkButton
    tiny
    tag
    neutral
    onClick={() => {
      window.location = PAY_PAL_DONATION_LINK;
    }}
  >
    <ButtonIcon>
      <FontAwesome icon={faDonate} />
    </ButtonIcon>
    Support
  </LinkButton>
);

export default Donate;
