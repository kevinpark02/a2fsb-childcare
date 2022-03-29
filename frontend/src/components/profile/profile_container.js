import { connect } from "react-redux";
import { fetchUserChildren } from "../../actions/child_actions";
import Profile from "./profile";

const mapStateToProps = (state) => {
    return {
        children: Object.values(state.children.user),
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserChildren: id => dispatch(fetchUserChildren(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);