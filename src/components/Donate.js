import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import faDonate from '@fortawesome/fontawesome-pro-solid/faDonate';

import { ButtonIcon, LinkButton } from './shared/Button';
import { PAY_PAL_DONATION_LINK } from '../constants/app';

const Donate = ({ theme }) => (
  <LinkButton
    size="sm"
    tag
    color={theme.dark ? 'subtleBg' : 'subtleFg'}
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

Donate.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme(Donate);
