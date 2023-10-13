interface KeyboardKeyProps {
  keyboardKey: string;
  clickHandler: Function;
  keyState: TileStatus;
}

interface KeyboardRowProps {
  keyboardRow: Array<string>;
  clickHandler: Function;
  keyStates: KeyStates;
}

interface KeyStates {
  [key: string]: TileStatus;
}

interface KeyboardProps {
  clickHandler: Function;
  boardState: BoardState;
}

interface KeyButtonProps {
  keyState: TileStatus;
}
