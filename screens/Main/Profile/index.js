import { connect } from "react-redux";
import { getUserById } from "../../../redux/usersSlice";
import ProfileContainer from "./ProfileContainer";

function mapStateToProps(state) {
  return {
    user: state.usersReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserById: () => dispatch(getUserById()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
