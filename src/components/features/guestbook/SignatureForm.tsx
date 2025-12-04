"use client";

import React, { useState } from "react";

interface SignatureFormProps {
  onSubmit: (signature: { name?: string; message: string; date: string }) => void;
  isSubmitting?: boolean;
}

export const SignatureForm: React.FC<SignatureFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSubmit({
      name: name.trim() || undefined,
      message: message.trim(),
      date: new Date().toISOString(),
    });

    setName("");
    setMessage("");
  };

  return (
    <div className="space-y-4">
      {/* Prompt text */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
        <p className="text-amber-900 text-sm leading-relaxed">
          <strong>What should you write?</strong> Leave a bit of advice for people visiting this website, 
          leave a link so we know who you are, or just say hello! You can either submit this anonymously 
          or leave your name - I don't care. Please do not vandalize my guest book or I will be sad af. 💔
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-amber-900 font-medium mb-1">
            Your Name <span className="text-amber-600 text-sm font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Leave blank to submit anonymously"
            className="w-full px-4 py-2 rounded-lg border border-amber-200 
                     focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-amber-900 font-medium mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Share your thoughts, advice, links, or just say hello..."
            className="w-full px-4 py-2 rounded-lg border border-amber-200 
                     focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg
                   hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Sign Guestbook"}
        </button>
      </form>
    </div>
  );
};
