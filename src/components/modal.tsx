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

const ModalHeader = styled.header`
  display: flex;
`;

const ModalTitle = styled.h2`
  flex: auto;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  border-radius: 8px;
  height: 2em;
  width: 2em;
  font-size: 1.25rem;
  cursor: pointer;
`;

const Modal = ({ setShowModal, isGameWin }: ModalProps) => {
  return (
    <ModalOverlay onClick={() => setShowModal(false)} data-testid="modal">
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Lorem Ipsum</ModalTitle>
          <CloseButton onClick={() => setShowModal(false)}>x</CloseButton>
        </ModalHeader>
        {isGameWin === null && <p>Game in-progress</p>}
        {isGameWin !== null && isGameWin && <p>You won!</p>}
        {isGameWin !== null && !isGameWin && <p>You lost...</p>}
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
