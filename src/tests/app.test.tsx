import { render, screen } from "@testing-library/react";
import App from "../-app";

test("should render app title", () => {
  render(<App />);
  const titleElement = screen.getByText("Wordle");
  expect(titleElement).toBeInTheDocument();
});
