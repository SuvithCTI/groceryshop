import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
      case 'success':
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
    }
  };

  const getBg = () => {
    switch (toast.type) {
      case 'error':
        return 'border-rose-200 bg-white/95 text-rose-950 shadow-rose-100';
      case 'info':
        return 'border-blue-200 bg-white/95 text-slate-900 shadow-blue-100';
      case 'success':
      default:
        return 'border-emerald-200 bg-white/95 text-slate-900 shadow-emerald-100';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md ${getBg()}`}>
        {getIcon()}
        <p className="text-sm font-semibold">{toast.message}</p>
      </div>
    </div>
  );
};
