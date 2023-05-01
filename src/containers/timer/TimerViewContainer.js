import { connect } from "react-redux";

import TimerView from "../../components/timer/TimerView";
import { requireTimes } from "../../actions";

export default connect(undefined, { requireTimes })(TimerView);
