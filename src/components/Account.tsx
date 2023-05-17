import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";

import IconButton from "./shared/IconButton";
import ToggleContent from "./shared/ToggleContent";
import Section from "./shared/Section";
import Button, { ButtonIcon } from "./shared/Button";
import Modal from "./shared/Modal";
import { getColor, getSize } from "../helpers/theme";
import { getNetworkState } from "../selectors/network";
import { login, logout } from "../slices/auth";
import { getAuthState } from "../selectors/auth";

const Account = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuthState);
  const { isOnline } = useSelector(getNetworkState);
  const { isLoggedIn, isInitialized, isLoggingIn, isLoggingOut, user } = auth;

  return (
    <span>
      <ToggleContent
        toggle={({ show }) => (
          <IconButton onClick={show}>
            {isInitialized && (
              <FontAwesomeIcon
                fixedWidth
                icon={isLoggedIn ? faUserAstronaut : faSignInAlt}
              />
            )}
            {!isInitialized && (
              <FontAwesomeIcon fixedWidth icon={faCircleNotch} spin />
            )}
          </IconButton>
        )}
        content={({ hide }) => (
          <Modal title={isLoggedIn ? "Account" : "Login"} onClose={hide}>
            <>
              {!isLoggedIn && (
                <>
                  <Section margin="md">
                    <p>
                      Login to store your times in the cloud and sync them with
                      all your devices!
                    </p>
                  </Section>
                  <Button
                    type="button"
                    color="googleRed"
                    disabled={!isOnline}
                    onClick={() =>
                      isOnline && !isLoggingIn && dispatch(login())
                    }
                  >
                    <ButtonIcon>
                      <FontAwesomeIcon
                        spin={isLoggingIn}
                        icon={isLoggingIn ? faCircleNotch : faGoogle}
                      />
                    </ButtonIcon>
                    Sign in with Google
                  </Button>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Section textAlign="center" margin="xl">
                    {isOnline && <Avatar src={user.photoURL} />}
                    {!isOnline && (
                      <AvatarIcon as="figure">
                        <FontAwesomeIcon size="2x" icon={faUserAstronaut} />
                      </AvatarIcon>
                    )}
                    <Name>{user.displayName}</Name>
                    <Email>{user.email}</Email>
                  </Section>
                  <Button
                    type="button"
                    onClick={() =>
                      !isLoggingOut && dispatch(logout()) && hide()
                    }
                  >
                    <ButtonIcon>
                      <FontAwesomeIcon
                        spin={isLoggingIn}
                        icon={isLoggingOut ? faCircleNotch : faSignOutAlt}
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
};

const Avatar = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  color: ${getColor("subtleFg")};
  margin: 0 0 ${getSize("sm")};
  border: 1px solid ${getColor("subtleBg")};
`;

const AvatarIcon = styled(Avatar)`
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.p`
  font-weight: bold;
  font-size: 1.7rem;
  margin: 0 0 ${getSize("xs")};
`;

const Email = styled.p`
  color: ${getColor("subtleFg")};
  margin: 0;
`;

export default React.memo(Account);
