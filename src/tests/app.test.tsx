import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../app";

test("renders app title", () => {
  render(<App />);
  const titleElement = screen.getByText(/It's Another Wordle Clone! 🤪/i);
  expect(titleElement).toBeInTheDocument();
});
