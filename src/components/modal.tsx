import styled from "styled-components";
import { colours } from "../constants";

const ModalOverlay = styled.dialog`
  display: flex;
  position: absolute;
  z-index: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContent = styled.div`
  margin: auto;
  padding: 1em;
  width: 30em;
  height: 30em;
  background-color: white;
  border: 1px solid ${colours.lightGrey};
  border-radius: 8px;
`;

const CloseButton = styled.button`
  background-color: ${colours.lightGrey};
  border: none;
`;

const Modal = ({ setShowModal }: ModalProps) => {
  return (
    <ModalOverlay onClick={() => setShowModal(false)} data-testid="modal">
      <ModalContent>
        <h2>Lorem Ipsum</h2>
        <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
