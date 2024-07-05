import styled from "styled-components";

export enum ToastMessage {
  NotInWordList,
  NotEnoughLetters,
}

const ToastWrapper = styled.div`
  display: block;
  position: absolute;
  top: 5rem;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 200px;
  background-color: black;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
`;

const Toast = ({ message }: { message: ToastMessage }) => {
  const messages = {
    [ToastMessage.NotInWordList]: "Not in word list",
    [ToastMessage.NotEnoughLetters]: "Not enough letters",
  };

  return <ToastWrapper role="alert">{messages[message]}</ToastWrapper>;
};

export default Toast;
