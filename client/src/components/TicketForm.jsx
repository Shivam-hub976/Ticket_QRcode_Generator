import { useState } from "react";
import DOMPurify from "dompurify";

export default function TicketForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    createdBy: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TRD: Unhappy Path - Invalid Inputs
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.createdBy.trim())
      newErrors.createdBy = "Creator ID is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TRD: Security - Sanitize against XSS before submission
    const sanitizedData = {
      title: DOMPurify.sanitize(formData.title),
      description: DOMPurify.sanitize(formData.description),
      priority: DOMPurify.sanitize(formData.priority),
      createdBy: DOMPurify.sanitize(formData.createdBy),
    };

    // TRD: Telemetry Simulation
    console.log(
      "[Analytics] User interacted with Ticket QR Code Generator Worker: Ticket Created",
    );

    onSubmit(sanitizedData);

    // Reset form
    setFormData({ title: "", description: "", priority: "Low", createdBy: "" });
    setErrors({});
  };

  const inputBaseClass =
    "mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 border transition-colors focus:outline-none focus:ring-2";
  const getErrorClass = (field) =>
    errors[field]
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-corporate-300 focus:border-corporate-500 focus:ring-corporate-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border border-corporate-200 mb-8"
      noValidate
    >
      <h2 className="text-xl font-bold text-corporate-800 mb-6 border-b pb-2">
        Generate New Ticket
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-corporate-700"
          >
            Ticket Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`${inputBaseClass} ${getErrorClass("title")}`}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p
              id="title-error"
              className="mt-1 text-sm text-red-600 font-medium"
              role="alert"
            >
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="createdBy"
            className="block text-sm font-medium text-corporate-700"
          >
            Created By (Staff ID)
          </label>
          <input
            type="text"
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className={`${inputBaseClass} ${getErrorClass("createdBy")}`}
            aria-invalid={!!errors.createdBy}
            aria-describedby={errors.createdBy ? "createdBy-error" : undefined}
          />
          {errors.createdBy && (
            <p
              id="createdBy-error"
              className="mt-1 text-sm text-red-600 font-medium"
              role="alert"
            >
              {errors.createdBy}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-corporate-700"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={`${inputBaseClass} border-corporate-300 focus:border-corporate-500 focus:ring-corporate-200`}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-corporate-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className={`${inputBaseClass} ${getErrorClass("description")} resize-none`}
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        ></textarea>
        {errors.description && (
          <p
            id="description-error"
            className="mt-1 text-sm text-red-600 font-medium"
            role="alert"
          >
            {errors.description}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-corporate-800 text-white font-semibold py-2 px-4 rounded hover:bg-corporate-900 focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:ring-offset-2 transition-colors"
      >
        Generate Ticket
      </button>
    </form>
  );
}
