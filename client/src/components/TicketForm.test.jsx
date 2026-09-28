import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TicketForm from "./TicketForm";

describe("TicketForm Component - Validation & Security", () => {
  it("prevents submission and shows red validation errors on empty fields", () => {
    const mockSubmit = vi.fn();
    render(<TicketForm onSubmit={mockSubmit} />);

    // Attempt submit without filling fields
    fireEvent.click(screen.getByRole("button", { name: /generate ticket/i }));

    // Submit should not be called
    expect(mockSubmit).not.toHaveBeenCalled();

    // Check for error messages mandated by TRD
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();

    // Check if the input gets the red error styling (testing for 'border-red-500' class)
    const titleInput = screen.getByLabelText(/ticket title/i);
    expect(titleInput.className).toMatch(/border-red-500/);
  });

  it("sanitizes XSS input and triggers telemetry on successful submit", () => {
    const mockSubmit = vi.fn();
    const consoleSpy = vi.spyOn(console, "log");

    render(<TicketForm onSubmit={mockSubmit} />);

    // Fill out form with malicious input
    fireEvent.change(screen.getByLabelText(/ticket title/i), {
      target: { value: '<script>alert("xss")</script>Router Down' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Needs reboot" },
    });
    fireEvent.change(screen.getByLabelText(/created by/i), {
      target: { value: "Staff-042" },
    });

    fireEvent.click(screen.getByRole("button", { name: /generate ticket/i }));

    // Expect the malicious script tags to be sanitized away
    expect(mockSubmit).toHaveBeenCalledWith({
      title: "Router Down",
      description: "Needs reboot",
      priority: "Low", // Default
      createdBy: "Staff-042",
    });

    // TRD Requirement: Simulated analytics ping
    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] User interacted with Ticket QR Code Generator Worker: Ticket Created",
    );

    consoleSpy.mockRestore();
  });
});
