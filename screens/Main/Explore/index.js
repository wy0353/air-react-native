import { connect } from "react-redux";
import ExploreContainer from "./ExploreContainer";
import { getRooms } from "../../../redux/roomsSlice";

function mapDispatchToProps(dispatch) {
  return {
    getRooms: () => dispatch(getRooms()),
  };
}

function mapStateToProps(state) {
  return state.roomsReducer.explore;
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
