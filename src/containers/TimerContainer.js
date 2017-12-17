import { connect } from 'react-redux';

import { obfuscateScramble } from '../helpers/scramble';
import Timer from '../components/Timer';

function mapStateToProps ({ timer, scramble }) {
  const { stopped, time } = timer;

  return {
    time,
    scramble: stopped ? scramble : obfuscateScramble(scramble)
  }
}

export default connect(mapStateToProps)(Timer);
