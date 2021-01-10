import { connect } from "react-redux";
import MapContainer from "./MapContainer";

function mapStateToProps(state) {
  return {
    rooms: state.roomsReducer.explore.rooms,
    token: state.usersReducer.token,
  };
}

export default connect(mapStateToProps)(MapContainer);
