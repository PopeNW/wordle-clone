interface KeyboardKey {
  key: string;
  code: string;
}

interface KeyboardKeyProps {
  keyboardKey: KeyboardKey;
  clickHandler: Function;
}

interface KeyboardRowProps {
  keyboardRow: Array<KeyboardKey>;
  clickHandler: Function;
}

interface KeyboardProps {
  clickHandler: Function;
}
