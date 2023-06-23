import styled from "styled-components";
import { colours } from "../constants";

const ModalBackground = styled.dialog`
  display: flex;
  position: absolute;
  z-index: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalWrapper = styled.div`
  margin: auto;
  padding: 1em;
  background-color: white;
  border: 1px solid black;
`;

const CloseButton = styled.button`
  background-color: ${colours.lightGrey};
  border: none;
`;

const Modal = ({ setShowModal }: ModalProps) => {
  return (
    <ModalBackground onClick={() => setShowModal(false)}>
      <ModalWrapper>
        <h2>Modal Title</h2>
        <p>Modal Content</p>
        <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default Modal;
