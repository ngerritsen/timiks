import { connect } from "react-redux";

import Import from "../../components/archive/Import";
import { importTimes } from "../../actions";

export default connect(undefined, { importTimes })(Import);
