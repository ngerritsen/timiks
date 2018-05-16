import scramblers222 from './scramble_222';
import scramblers333 from './scramble_333';
import scramblersClock from './scramble_clock';
import scramblersMegaminx from './scramble_minx';
import scramblersNnn from './scramble_NNN';
import scramblersPyraminx from './scramble_pyram';
import scramblersSquare1 from './scramble_sq1';

export default {
  ...scramblers222,
  ...scramblers333,
  ...scramblersNnn,
  ...scramblersClock,
  ...scramblersMegaminx,
  ...scramblersNnn,
  ...scramblersPyraminx,
  ...scramblersSquare1
};
