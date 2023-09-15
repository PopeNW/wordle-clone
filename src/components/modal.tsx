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

const Modal = ({ setShowModal, isGameWin, wordleAnswer }: ModalProps) => {
  const title =
    isGameWin === undefined ? "Settings" : isGameWin ? "You won!" : "You lost.";

  return (
    <ModalOverlay onClick={() => setShowModal(false)} data-testid="modal">
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={() => setShowModal(false)}>x</CloseButton>
        </ModalHeader>
        {isGameWin && (
          <p>
            The answer was <b>{wordleAnswer}</b>
          </p>
        )}
        {isGameWin === false && (
          <p>
            The answer was <b>{wordleAnswer}</b>
          </p>
        )}
        {isGameWin === undefined && <p>Game in-progress</p>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
