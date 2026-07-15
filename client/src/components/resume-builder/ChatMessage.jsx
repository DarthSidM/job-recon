// src/components/resume-builder/ChatMessage.jsx

import React from "react";

export default function ChatMessage({ role, content }) {
    const isUser = role === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap break-words shadow-sm ${
                    isUser
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-slate-100 text-slate-800 rounded-bl-md"
                }`}
            >
                {content}
            </div>
        </div>
    );
}