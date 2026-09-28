import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TicketList from "./TicketList";

describe("TicketList Component - Unhappy Paths", () => {
  it("displays a loading indicator when data is fetching", () => {
    render(<TicketList isLoading={true} tickets={[]} />);
    // Checks for accessibility role="status" mandated by TRD
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
  });

  it('displays a user-friendly "No data found" message when list is empty', () => {
    render(<TicketList isLoading={false} tickets={[]} />);
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  it("renders a list of tickets when data is provided", () => {
    const mockTickets = [
      { _id: "1", ticketId: "TKT-1001", title: "Network Router Down" },
    ];
    render(<TicketList isLoading={false} tickets={mockTickets} />);
    expect(screen.getByText("TKT-1001")).toBeInTheDocument();
    expect(screen.getByText("Network Router Down")).toBeInTheDocument();
  });
});
