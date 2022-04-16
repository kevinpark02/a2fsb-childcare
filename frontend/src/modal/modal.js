import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";
import NewChildContainer from "../components/children/new_child_container";

function Modal({ modal, childId, closeModal }) {
  if (!modal) {
    return null;
  }

  let component;
  switch (modal) {
    case "newChild":
      component = (
        <NewChildContainer childId={childId} closeModal={closeModal} />
      );
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal[0],
    cardId: state.ui.modal[1],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);