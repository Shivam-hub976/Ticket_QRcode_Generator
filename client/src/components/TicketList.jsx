import { QRCodeSVG } from "qrcode.react";

export default function TicketList({ isLoading, tickets }) {
  // Unhappy Path 1: Bad Connectivity (Loading State)
  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center p-12 text-corporate-500"
        role="status"
        aria-live="polite"
      >
        <svg
          className="animate-spin h-8 w-8 mr-3 text-corporate-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-lg font-semibold">Loading data...</span>
      </div>
    );
  }

  // Unhappy Path 2: Empty States
  if (!tickets || tickets.length === 0) {
    return (
      <div className="bg-white border border-corporate-200 rounded-lg p-12 text-center shadow-sm">
        <p className="text-corporate-700 text-xl font-semibold">
          No data found
        </p>
        <p className="text-corporate-500 mt-2">
          Generate a new ticket to populate this list.
        </p>
      </div>
    );
  }

  // Happy Path: Data exists
  return (
    <div className="grid gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="bg-white border border-corporate-200 rounded-lg p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition-shadow"
        >
          <div className="mb-4 sm:mb-0">
            <span className="text-xs font-bold text-corporate-600 bg-corporate-100 px-2 py-1 rounded uppercase tracking-wider">
              {ticket.ticketId}
            </span>
            <h3 className="text-corporate-900 font-semibold mt-2 text-lg">
              {ticket.title}
            </h3>
            <p className="text-sm text-corporate-500 mt-1">
              {ticket.description}
            </p>
            <div className="mt-2 text-xs text-corporate-400">
              Priority:{" "}
              <span className="font-medium text-corporate-600">
                {ticket.priority}
              </span>{" "}
              | Creator: {ticket.createdBy}
            </div>
          </div>
          <div className="bg-white p-2 border border-corporate-200 rounded shrink-0">
            {/* The QR Code uses the unique ticketId as its payload */}
            <QRCodeSVG value={ticket.ticketId} size={80} level="M" />
          </div>
        </div>
      ))}
    </div>
  );
}
