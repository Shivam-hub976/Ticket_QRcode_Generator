import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("renders the corporate title", () => {
    render(<App />);
    const heading = screen.getByText(/QRCore: Enterprise Ticket Management/i);
    expect(heading).toBeInTheDocument();
  });
});
