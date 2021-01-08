import { connect } from "react-redux";
import ExploreContainer from "./ExploreContainer";
import { getRooms, increasePage } from "../../../redux/roomsSlice";

function mapDispatchToProps(dispatch) {
  return {
    getRooms: page => dispatch(getRooms(page)),
    increasePage: () => dispatch(increasePage()),
  };
}

function mapStateToProps(state) {
  return state.roomsReducer.explore;
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
