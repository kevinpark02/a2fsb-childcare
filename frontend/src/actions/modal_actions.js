export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modal, childId) => {
  return {
    type: OPEN_MODAL,
    modal,
    childId,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
