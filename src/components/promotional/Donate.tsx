import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons/faDonate";

import { ButtonIcon, LinkButton } from "../shared/Button";
import { PAY_PAL_DONATION_LINK } from "../../constants/donation";

const Donate = () => (
  <LinkButton size="sm" tag color="grey" outline href={PAY_PAL_DONATION_LINK}>
    <ButtonIcon color="subtleFg">
      <FontAwesomeIcon icon={faDonate} />
    </ButtonIcon>
    Support
  </LinkButton>
);

export default Donate;
