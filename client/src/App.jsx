import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  // Simulate fetching data from the API on mount (Unhappy Path: Bad Connectivity)
  useEffect(() => {
    const fetchTickets = async () => {
      // Simulating a 1.5 second 3G network delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    fetchTickets();
  }, []);

  const handleCreateTicket = (ticketData) => {
    setIsLoading(true); // Trigger loading state while processing

    // Simulate API request to POST /api/v1/tickets
    setTimeout(() => {
      const newTicket = {
        ...ticketData,
        _id: uuidv4(),
        ticketId: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "Open",
        createdAt: new Date().toISOString(),
      };

      setTickets([newTicket, ...tickets]); // Prepend new ticket
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto">
      <header className="mb-8 border-b-2 border-corporate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-corporate-900 tracking-tight">
          QRCore Worker
        </h1>
        <p className="text-corporate-500 text-sm mt-1">
          Enterprise Ticket Management System
        </p>
      </header>

      <main>
        <TicketForm onSubmit={handleCreateTicket} />

        <div className="mb-4">
          <h2 className="text-xl font-bold text-corporate-800">
            Recent Tickets
          </h2>
        </div>

        <TicketList isLoading={isLoading} tickets={tickets} />
      </main>
    </div>
  );
}

export default App;
