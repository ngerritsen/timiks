import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';

import faUserAstronaut from '@fortawesome/fontawesome-pro-solid/faUserAstronaut';
import faSignInAlt from '@fortawesome/fontawesome-pro-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-pro-solid/faSignOutAlt';
import faSpinnerThird from '@fortawesome/fontawesome-pro-solid/faSpinnerThird';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';

import IconButton from './shared/IconButton';
import ToggleContent from './shared/ToggleContent';
import Section from './shared/Section';
import Button, { ButtonIcon } from './shared/Button';
import Modal from './shared/Modal';

const Account = ({
  isLoggedIn,
  login,
  logout,
  displayName,
  email,
  isLoggingIn,
  isLoggingOut,
  isInitialized
}) => (
  <span>
    <ToggleContent
      toggle={({ show }) => (
        <IconButton onClick={show}>
          {isInitialized && (
            <FontAwesome fixedWidth icon={isLoggedIn ? faUserAstronaut : faSignInAlt} />
          )}
          {!isInitialized && <FontAwesome fixedWidth icon={faSpinnerThird} spin />}
        </IconButton>
      )}
      content={({ hide }) => (
        <Modal title={isLoggedIn ? 'Account' : 'Login'} onClose={hide}>
          <>
            {!isLoggedIn && (
              <>
                <Section margin="md">
                  <p>Login to store your times in the cloud and sync them with all your devices!</p>
                </Section>
                <Button type="button" color="googleRed" onClick={() => !isLoggingIn && login()}>
                  <ButtonIcon>
                    <FontAwesome
                      spin={isLoggingIn}
                      icon={isLoggingIn ? faSpinnerThird : faGoogle}
                    />
                  </ButtonIcon>
                  Sign in with Google
                </Button>
              </>
            )}
            {isLoggedIn && (
              <>
                <Section margin="md">
                  <p>
                    Hi {displayName}, you are logged in with your Google account ({email}).
                  </p>
                </Section>
                <Button type="button" red onClick={() => !isLoggingOut && logout() && hide()}>
                  <ButtonIcon>
                    <FontAwesome
                      spin={isLoggingIn}
                      icon={isLoggingOut ? faSpinnerThird : faSignOutAlt}
                    />
                  </ButtonIcon>
                  Sign out
                </Button>
              </>
            )}
          </>
        </Modal>
      )}
    />
  </span>
);

Account.propTypes = {
  isLoggedIn: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
  isLoggingOut: PropTypes.bool,
  displayName: PropTypes.string,
  isInitialized: PropTypes.bool,
  email: PropTypes.string,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default React.memo(Account);
