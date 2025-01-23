'use client';

import React, { useState } from 'react';

interface SignatureFormProps {
  onSubmit: (signature: { name: string; message: string; date: string }) => void;
}

export const SignatureForm: React.FC<SignatureFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onSubmit({
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    });

    setName('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-amber-900 font-medium mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-amber-200 
                   focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-amber-900 font-medium mb-1">
          Leave a Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-amber-200 
                   focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-amber-600 text-white rounded-lg
                 hover:bg-amber-700 transition-colors"
      >
        Sign Guestbook
      </button>
    </form>
  );
}; 