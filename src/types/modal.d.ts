type ModalTypes = "help" | "statistics" | "settings";

interface ModalProps {
  setShowModal: Function;
  type: ModalTypes;
}
