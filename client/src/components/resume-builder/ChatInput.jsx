// src/components/resume-builder/ChatInput.jsx

import React from "react";
import { Send, Loader2 } from "lucide-react";

export default function ChatInput({
    value,
    onChange,
    onSend,
    loading = false,
    placeholder = "Ask how to improve your resume...",
}) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!loading && value.trim()) {
                onSend();
            }
        }
    };

    return (
        <div className="border-t border-slate-200 bg-white p-4">
            <div className="flex items-end gap-3">
                <textarea
                    rows={1}
                    value={value}
                    disabled={loading}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                />

                <button
                    onClick={onSend}
                    disabled={loading || !value.trim()}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                    {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Send size={18} />
                    )}
                </button>
            </div>
        </div>
    );
}