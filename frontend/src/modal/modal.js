import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";
import NewChildContainer from "../components/children/new_child_container";
import ChildrenShowContainer from "../components/children_show/children_show_container";
import './modal.css';

function Modal({ modal, childId, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "newChild":
      component = (
        <NewChildContainer closeModal={closeModal} />
      );
      break;
    case "editChild":
        component = (
          <ChildrenShowContainer
            closeModal={closeModal}
            childId={childId}
          />
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
    childId: state.ui.modal[1]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);