type ModalTypes = "help" | "statistics" | "settings" | "game-over";

interface ModalProps {
  setShowModal: Function;
  type: ModalTypes;
  wordle: string;
  isGameWin: boolean | undefined;
}
