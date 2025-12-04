"use client";

import React, { useState, useEffect } from "react";
import { SignatureForm } from "./SignatureForm";

interface Signature {
  id: string;
  name?: string;
  message: string;
  date: string;
}

export const GuestBook: React.FC = () => {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load signatures on mount
  useEffect(() => {
    loadSignatures();
  }, []);

  const loadSignatures = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guestbook');
      if (!response.ok) throw new Error('Failed to load signatures');
      const data = await response.json();
      setSignatures(data.signatures || []);
    } catch (err) {
      console.error('Error loading signatures:', err);
      setError('Failed to load guestbook entries');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSignature = async (signature: Omit<Signature, "id">) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signature),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit signature');
      }

      const newSignature = await response.json();
      setSignatures((prev) => [newSignature, ...prev]);
    } catch (err: any) {
      console.error('Error submitting signature:', err);
      setError(err.message || 'Failed to submit signature. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const response = await fetch(`/api/guestbook?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete signature');

      setSignatures((prev) => prev.filter((sig) => sig.id !== id));
    } catch (err) {
      console.error('Error deleting signature:', err);
      setError('Failed to delete entry');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-amber-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-amber-900 mb-4">Sign the Guestbook</h3>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <SignatureForm onSubmit={handleNewSignature} isSubmitting={isSubmitting} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-amber-900">Recent Signatures</h3>
          <button
            onClick={loadSignatures}
            className="text-sm text-amber-600 hover:text-amber-800 underline"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-amber-700">Loading signatures...</p>
        ) : signatures.length === 0 ? (
          <p className="text-amber-700">No signatures yet. Be the first to sign!</p>
        ) : (
          <div className="space-y-4">
            {signatures.map((signature) => (
              <div
                key={signature.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-amber-100 relative group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-amber-900">
                    {signature.name || "Anonymous"}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-amber-600">
                      {new Date(signature.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <button
                      onClick={() => handleDelete(signature.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm transition-opacity"
                      title="Delete entry"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <p className="text-amber-800 whitespace-pre-wrap break-words">{signature.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
