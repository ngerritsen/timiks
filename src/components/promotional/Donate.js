import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import faDonate from '@fortawesome/fontawesome-pro-solid/faDonate';

import { ButtonIcon, LinkButton } from '../shared/Button';
import { PAY_PAL_DONATION_LINK } from '../../constants/donation';

const Donate = () => (
  <LinkButton size="sm" tag color="grey" outline href={PAY_PAL_DONATION_LINK}>
    <ButtonIcon color="green">
      <FontAwesome icon={faDonate} />
    </ButtonIcon>
    Support
  </LinkButton>
);

Donate.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme(Donate);
