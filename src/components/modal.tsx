import { useEffect, useState } from "react";
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

const HelpContent = () => {
  return <p>"You wanna get nuts? Let's get nuts!"</p>;
};

const StatisticsContent = () => {
  return <p>"You wanna get nuts? Let's get nuts!"</p>;
};

const SettingsContent = () => {
  return <p>"You wanna get nuts? Let's get nuts!"</p>;
};

const Modal = ({ setShowModal, type }: ModalProps) => {
  const [title, setTitle] = useState<string>("test");
  const [content, setContent] = useState<React.ReactNode>("test");

  useEffect(() => {
    switch (type) {
      case "help":
        setTitle("How To Play");
        setContent(<HelpContent />);
        break;
      case "statistics":
        setTitle("Statistics");
        setContent(<StatisticsContent />);
        break;
      case "settings":
        setTitle("Settings");
        setContent(<SettingsContent />);
        break;
    }
  }, [type]);

  return (
    <ModalOverlay data-testid="modal">
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={() => setShowModal(null)}>x</CloseButton>
        </ModalHeader>
        {content}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
