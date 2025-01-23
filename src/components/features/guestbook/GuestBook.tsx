'use client';

import React, { useState } from 'react';
import { SignatureForm } from './SignatureForm';

interface Signature {
  id: string;
  name: string;
  message: string;
  date: string;
}

export const GuestBook: React.FC = () => {
  const [signatures, setSignatures] = useState<Signature[]>([]);

  const handleNewSignature = (signature: Omit<Signature, 'id'>) => {
    const newSignature = {
      ...signature,
      id: Date.now().toString(),
    };

    setSignatures((prev) => [newSignature, ...prev]);

    // In a real app, we would save this to the JSON file
    console.log('New signature:', newSignature);
  };

  return (
    <div className="space-y-8">
      <div className="bg-amber-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-amber-900 mb-4">
          Sign the Guestbook
        </h3>
        <SignatureForm onSubmit={handleNewSignature} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-amber-900">
          Recent Signatures
        </h3>
        
        {signatures.length === 0 ? (
          <p className="text-amber-700">No signatures yet. Be the first to sign!</p>
        ) : (
          <div className="space-y-4">
            {signatures.map((signature) => (
              <div
                key={signature.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-amber-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-amber-900">{signature.name}</h4>
                  <span className="text-sm text-amber-600">
                    {new Date(signature.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-amber-800">{signature.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 