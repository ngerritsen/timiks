import React, { useState } from 'react';
import styled from 'styled-components';

import ToggleContent from './shared/ToggleContent';
import Button, { ButtonIcon } from './shared/Button';
import Modal from './shared/Modal';
import FontAwesome from '@fortawesome/react-fontawesome';
import faCaretCircleLeft from '@fortawesome/fontawesome-pro-solid/faCaretCircleLeft';
import faCaretCircleRight from '@fortawesome/fontawesome-pro-solid/faCaretCircleRight';
import faStar from '@fortawesome/fontawesome-pro-solid/faStar';

const Showcase = () => {
  const features = [
    {
      title: 'Cloud sync',
      content: (
        <>
          <p>
            Sync your times across all your devices, in realtime. Transition to a different device
            mid session or track your progress everywhere with the archive. No more manual imports
            and exports.
          </p>
          <p>
            Your current session will be synced too. You can time on your phone, and see your stats
            update live, on your laptop&apos;s screen.
          </p>
          <p>With Google login it&apos;s a matter of seconds to start syncing.</p>
          <Image src="/images/cloud-sync.png" />
        </>
      )
    },
    {
      title: 'Precision timer',
      content: (
        <>
          <p>
            An accurate timer made for speedsolvers. Responds immediately at your input, so that you
            can get that important 100st of a second accuracy.
          </p>
          <p>The activation duration is configurable to personalize the feel.</p>
          <Image src="/images/timer.png" />
          <p>
            Quick controls will let you quickly mark the time with a plus 2 penalty or DNF. Keyboard
            shortcuts are there for the real power users.
          </p>
          <Image src="/images/plus-2.png" />
          <p>
            Manual time entry allows you to quickly enter times that were timed from a different
            source. You can even enter DNF or add +2 to immediately mark the time with a penalty!
          </p>
          <Image src="/images/manual-entry.png" />
          <p>
            Enable inspection time to prepare for those WCA solves, the solve will DNF when it
            expired.
          </p>
        </>
      )
    },
    {
      title: 'Archive',
      content: (
        <>
          <p>
            Keep track of all your times using the archive. In combination with cloud sync you can
            can track your progress on all devices. The times are nicely organized by date and
            event. You can even preview the scrambles of any solve in history.
          </p>
          <Image src="/images/archive-graph.png" />
          <Image src="/images/archive-times.png" />
        </>
      )
    },
    {
      title: 'Dark mode',
      content: (
        <>
          <p>
            Stunning true dark mode. Look&apos;s great on all devices. Easy on the eyes at night,
            and might save you some battery on an OLED screen.
          </p>
          <Image src="/images/dark-mode.png" />
        </>
      )
    },
    {
      title: 'Rich timer experience',
      content: (
        <>
          <p>
            While solving, you want a timer that is fluid and insightful. Your current session will
            show stats, a graph, your times with their details and scramble previews for cubic
            puzzles. As a bonus, if you are logged in, you will be able to have multiple devices and
            screens show the same session!
          </p>
          <Image src="/images/time-table.png" />
        </>
      )
    },
    {
      title: 'Relays',
      content: (
        <>
          <p>Relays with nice, tabbed scrambles and previews.</p>
          <Image src="/images/relay-timer.png" />
          <p>You can even view all the scrambles the relays of any time in history</p>
          <Image src="/images/relay-details.png" />
        </>
      )
    }
  ];

  const [featureIndex, setFeatureIndex] = useState(0);
  const { title, content } = features[featureIndex];

  return (
    <ToggleContent
      toggle={({ show }) => (
        <Button tag tiny empty subtle onClick={show}>
          <StarIcon>
            <FontAwesome icon={faStar} />
          </StarIcon>
          Show features
        </Button>
      )}
      content={({ hide }) => (
        <Modal onClose={hide} title="Features">
          <FeatureTitleBar>
            <ArrowIconWrapper>
              {featureIndex > 0 && (
                <FontAwesome
                  icon={faCaretCircleLeft}
                  onClick={() => setFeatureIndex(featureIndex - 1)}
                />
              )}
            </ArrowIconWrapper>
            <FeatureTitle>{title}</FeatureTitle>
            <ArrowIconWrapper>
              {featureIndex < features.length - 1 && (
                <FontAwesome
                  icon={faCaretCircleRight}
                  onClick={() => setFeatureIndex(featureIndex + 1)}
                />
              )}
            </ArrowIconWrapper>
          </FeatureTitleBar>
          {content}
        </Modal>
      )}
    />
  );
};

const Image = styled.img`
  width: 100%;
  border-radius: 0.4rem;
  margin-top: ${props => props.theme.sizes.xs};
`;

const StarIcon = ButtonIcon.extend`
  color: ${props => props.theme.colors.orange};
`;

const ArrowIconWrapper = styled.div`
  color: ${props => props.theme.colors.blue};
  cursor: pointer;
  font-size: 1.1em;
  width: 2rem;
  text-align: center;
`;

const FeatureTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.subtleBg};
  border-top: 1px solid ${props => props.theme.colors.subtleBg};
  padding: ${props => props.theme.sizes.xs};
`;

const FeatureTitle = styled.h3`
  text-align: center;
  margin: 0;
`;

export default Showcase;
