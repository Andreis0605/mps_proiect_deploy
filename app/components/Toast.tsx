"use client";

import React, { useEffect } from 'react';

type ToastProps = {
  visible: boolean;
  message?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // ms
  onClose?: () => void;
};

export default function Toast({ visible, message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const bg = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-gray-800';

  return (
    <div className={`fixed top-4 right-4 z-50 ${bg} text-white rounded-lg shadow-lg px-4 py-3 max-w-sm`} role="status">
      <div className="flex items-center gap-3">
        <div className="flex-1 text-sm">{message}</div>
        <button onClick={() => onClose && onClose()} aria-label="Close toast" className="opacity-90 hover:opacity-100">✕</button>
      </div>
    </div>
  );
}
