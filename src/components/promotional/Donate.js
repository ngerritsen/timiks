import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate } from '@fortawesome/pro-solid-svg-icons/faDonate';

import { ButtonIcon, LinkButton } from '../shared/Button';
import { PAY_PAL_DONATION_LINK } from '../../constants/donation';

const Donate = () => (
  <LinkButton size="sm" tag color="grey" outline href={PAY_PAL_DONATION_LINK}>
    <ButtonIcon color="green">
      <FontAwesomeIcon icon={faDonate} />
    </ButtonIcon>
    Support
  </LinkButton>
);

Donate.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme(Donate);
