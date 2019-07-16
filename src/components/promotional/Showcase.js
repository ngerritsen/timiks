import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

import ToggleContent from '../shared/ToggleContent';
import Button, { ButtonIcon } from '../shared/Button';
import Scramble from '../scramble/Scramble';
import Modal from '../shared/Modal';
import FontAwesome from '@fortawesome/react-fontawesome';
import faCaretCircleLeft from '@fortawesome/fontawesome-pro-solid/faCaretCircleLeft';
import faCaretCircleRight from '@fortawesome/fontawesome-pro-solid/faCaretCircleRight';
import faStar from '@fortawesome/fontawesome-pro-solid/faStar';
import KeyMap from '../KeyMap';
import Section from '../shared/Section';
import Shortcut from '../shared/Shortcut';
import { BUTTON_COLORS } from '../../constants/settings';
import { getSize, getColor } from '../../helpers/theme';
import TrainerCaseDetails from '../trainer/TrainerCaseDetails';
import { cases, PLL, OLL } from '../../constants/trainer';

const relayScramble = `2x2x2 U' F' U F2 R' F2 R F' R' 3x3x3 F2 R B2 R2 D2 R' B2 L D2 B2 R B' R U' L2 R' F' U2 L' B2 D' 4x4x4 Rw Uw2 Fw Rw2 Fw' D2 F' Uw U' L2 R Fw' D' L Rw' R Uw R Uw Rw2 U2 L2 F2 L R2 U F' U' B F' L' D2 Fw2 D2 Fw L Rw2 R' F Uw 5x5x5 L B Fw' U L2 Lw Dw2 Uw U' L' Fw2 Uw2 Lw' F Dw Fw' F' R' Uw U2 B2 L Bw L' Lw' Dw Lw Rw2 Dw2 U B2 Bw2 Fw2 Lw' D' Dw' U Lw Bw2 R2 B2 L Bw2 F' L' Bw Lw' Fw Uw Fw2 F2 Dw R Bw2 F2 D2 Fw2 R B2 F 6x6x6 B2 3Fw Uw' R2 U2 R B Rw 3Uw2 Lw2 Dw' Fw2 D2 Lw2 Fw2 Rw' D2 3Fw Lw' B2 3Fw Fw2 D2 3Uw' U' L2 Lw R2 Bw Rw' D' Dw2 B' 3Fw R2 3Fw 3Rw Fw2 F Lw2 R D L' 3Fw Dw 3Uw' L Rw D2 Uw' Fw' R 3Uw' B' Fw' F' 3Uw B' L Uw R2 3Fw2 Fw' L2 3Rw' Fw2 L' R' Uw2 Bw 7x7x7 U2 R' 3Fw2 3Rw' Bw' 3Uw 3Bw2 Fw2 3Rw Dw U' 3Fw' 3Rw2 Fw2 3Uw' 3Lw2 3Fw' F' Rw2 3Fw 3Rw2 3Dw2 3Uw2 Rw B' 3Bw' Uw Bw 3Dw F' 3Lw2 Uw2 B2 R D2 U Rw 3Dw2 U 3Lw B2 Dw2 B' 3Lw' Rw2 Dw2 3Uw2 3Bw' Dw2 L' 3Rw2 3Uw2 U 3Bw' 3Fw2 Fw2 F2 R' Uw2 3Lw Dw' Uw2 B2 R' 3Dw' B' Fw 3Uw' U' Lw F D' L Lw' Uw R2 3Fw' Lw2 3Dw' Rw U2 Bw2 3Bw 3Fw' L' 3Lw B2 Bw' D2 L2 3Dw' Uw2 3Fw' D' U' Rw' 3Dw 3Rw D' 3Bw'`;

const Showcase = ({ theme }) => {
  const screenshotTheme = theme.dark ? 'dark' : 'light';
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
            update live on your laptop&apos;s screen. If you are not logged in, times will still be
            saved locally and synced after you login.
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
            can get that important 100st of a second accuracy. Enable inspection time with voice
            warnings to prepare for those WCA solves, the solve will DNF when it expired.
          </p>
          <p>
            Quick controls will let you quickly mark the time with a plus 2 penalty or DNF. Keyboard
            shortcuts are there for the real power users.
          </p>
          <Image src={`/images/timer-${screenshotTheme}.png`} />
          <p>
            Manual time entry allows you to quickly enter times that were timed from a different
            source. You can even enter DNF or add +2 to immediately mark the time with a penalty!
          </p>
          <Image src={`/images/manual-entry-${screenshotTheme}.png`} />
        </>
      )
    },
    {
      title: 'Archive',
      content: (
        <>
          <p>
            Keep track of all your times using the archive. In combination with cloud sync you can
            track your progress on all devices. The times are nicely organized by date and event.
            You can even preview the scrambles of any solve in history.
          </p>
          <Image src={`/images/archive-graph-${screenshotTheme}.png`} />
          <Image src={`/images/archive-times-${screenshotTheme}.png`} />
        </>
      )
    },
    {
      title: 'OLL/PLL Trainer',
      content: (
        <>
          <p>
            Train your OLL and PLL using the same awesome precision timer from Timiks. Select the
            cases to train and time your solutions.
          </p>
          <Image src={`/images/trainer-times-${screenshotTheme}.png`} />
          <p>
            All cases organized according to the Cubeskills categorization with beautiful previews.
          </p>
          <Image src={`/images/cases-${screenshotTheme}.png`} />
          <Section margin="md">
            <p>
              No need to leave Timiks to learn algorithms, information about every case right in
              Timiks!
            </p>
          </Section>
          <Section margin="sm">
            <TrainerCaseDetails trainingCase={cases[PLL][4]} trainingType={PLL} />
          </Section>
          <TrainerCaseDetails trainingCase={cases[OLL][4]} trainingType={OLL} />
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
          <Image src={`/images/time-table-${screenshotTheme}.png`} />
        </>
      )
    },
    {
      title: 'Powerful keyboard shortcuts',
      content: (
        <>
          <p>
            Power users will love the keyboard shortcuts, allowing the switching of modes and
            settings fast and efficient.
          </p>
          <KeyMap />
        </>
      )
    },
    {
      title: 'Export to CSV',
      content: (
        <>
          <p>
            Take control of your own analysis, with export as CSV you can have your archive per
            puzzle in your own spreadsheet application.
          </p>
          <Image src="/images/csv.png" />
          <p>
            You can import your existing sessions from Twisty Timer and csTimer, to continue where
            you left off.
          </p>
        </>
      )
    },
    {
      title: 'Relays',
      content: (
        <>
          <p>
            Relays with nice, tabbed scrambles and previews. You can even view the scramble previews
            of all historic relays in the archive.
          </p>
          <Scramble scramble={relayScramble} puzzle="2-7-relay" withPreview />
        </>
      )
    },
    {
      title: 'Make it your own',
      content: (
        <>
          <p>
            Configure your activation delay, hide the time during the solve or change the start
            button color to make the timer your own.
          </p>
          {BUTTON_COLORS.slice(2).map(option => (
            <Section margin="xs" key={option.value}>
              <Button color={option.value}>Start</Button>
            </Section>
          ))}
        </>
      )
    }
  ];

  const [featureIndex, setFeatureIndex] = useState(0);
  const { title, content } = features[featureIndex];

  return (
    <ToggleContent
      toggle={({ show }) => (
        <Button tag size="sm" outline color="grey" onClick={show}>
          <ButtonIcon color="yellow">
            <FontAwesome icon={faStar} />
          </ButtonIcon>
          Show features
        </Button>
      )}
      content={({ hide }) => (
        <Modal onClose={hide} title="Features">
          <FeatureTitleBar>
            <ArrowIconWrapper>
              {featureIndex > 0 && (
                <>
                  <FontAwesome
                    icon={faCaretCircleLeft}
                    onClick={() => setFeatureIndex(featureIndex - 1)}
                  />
                  <Shortcut command="previous" action={() => setFeatureIndex(featureIndex - 1)} />
                </>
              )}
            </ArrowIconWrapper>
            <FeatureTitle>{title}</FeatureTitle>
            <ArrowIconWrapper>
              {featureIndex < features.length - 1 && (
                <>
                  <FontAwesome
                    icon={faCaretCircleRight}
                    onClick={() => setFeatureIndex(featureIndex + 1)}
                  />
                  <Shortcut command="next" action={() => setFeatureIndex(featureIndex + 1)} />
                </>
              )}
            </ArrowIconWrapper>
          </FeatureTitleBar>
          {content}
        </Modal>
      )}
    />
  );
};

Showcase.propTypes = {
  theme: PropTypes.object.isRequired
};

const Image = styled.img`
  width: 100%;
  border-radius: 0.3rem;
  margin-top: ${getSize('xs')};
`;

const ArrowIconWrapper = styled.div`
  color: ${getColor('blue')};
  cursor: pointer;
  font-size: 1.1em;
  width: 2rem;
  text-align: center;
`;

const FeatureTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${getColor('subtleBg')};
  border-top: 1px solid ${getColor('subtleBg')};
  padding: ${getSize('xs')};
`;

const FeatureTitle = styled.h3`
  text-align: center;
  margin: 0;
`;

export default withTheme(Showcase);
