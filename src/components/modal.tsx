import styled from "styled-components";

const ModalWrapper = styled.dialog`
  background-color: green;
`;

const Modal = () => {
  return (
    <ModalWrapper>
      <h2>Modal Title</h2>
      <p>Modal Content</p>
    </ModalWrapper>
  );
};

export default Modal;
