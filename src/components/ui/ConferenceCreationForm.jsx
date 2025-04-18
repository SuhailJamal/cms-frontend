"use client";
import { motion } from "framer-motion";
import {toast} from "react-hot-toast";
import { useState } from "react";

export default function ConferenceCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    submissionDeadline: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/conferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create conference");
      }
      
      // Show success toast and reset form
      toast.success("Conference created successfully!");
      
      // Reset form after successful submission
      setFormData({
        name: "",
        submissionDeadline: "",
        location: "",
        description: ""
      });
      
    } catch (err) {
      setError(err.message);
      toast.error("Failed to create conference");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Create a Conference
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Conference Name
            </label>
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter conference name"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Submission Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Submission Deadline
            </label>
            <motion.input
              type="date"
              name="submissionDeadline"
              value={formData.submissionDeadline}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <motion.input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter location"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <motion.textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description (optional)"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Conference"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
