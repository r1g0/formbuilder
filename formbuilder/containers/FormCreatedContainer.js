import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormCreated from "../components/FormCreated";
import { resetForm } from "../actions/fieldlist";


function mapDispatchToProps(dispatch) {
  const actionCreators = {resetForm};
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  (s) => s,
  mapDispatchToProps,
)(FormCreated);
