// src/components/resume-builder/ResumeChatDrawer.jsx

import { useEffect, useRef, useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { buildResume } from "../../apis/resume-builder";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";


export default function ResumeChatDrawer({
    open,
    job,
    activeResumeId,
    onClose,
}) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // reset when drawer closes
    useEffect(() => {
        if (!open) {
            setMessages([]);
            setInput("");
            setLoading(false);
            setSessionId(null);
        }
    }, [open]);

    // first request
    useEffect(() => {
        if (!open || !job || messages.length > 0) return;

        initializeConversation();
    }, [open]);

    async function initializeConversation() {
        try {
            setLoading(true);

            const starter =
                "Analyze my resume against this job description and tell me the biggest improvements I should make before applying.";

            setMessages([
                {
                    role: "user",
                    content: starter,
                },
            ]);

            const res = await buildResume({
                message: starter,
                jd: job.job_description,
            });

            setSessionId(res.data.session_id);

            setMessages([
                {
                    role: "user",
                    content: starter,
                },
                {
                    role: "assistant",
                    content: res.data.response,
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    async function sendMessage() {
        if (!input.trim() || loading) return;

        const text = input;

        setInput("");

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: text,
            },
        ]);

        try {
            setLoading(true);

            const res = await buildResume({
                message: text,
                jd: job.job_description,
                session_id: sessionId,
            });

            setSessionId(res.data.session_id);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: res.data.response,
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20">
            <div className="w-[460px] bg-white h-full shadow-2xl flex flex-col">

                {/* Header */}

                <div className="border-b px-5 py-4 flex justify-between items-center">

                    <div>

                        <h2 className="font-bold text-lg">
                            Resume Customizer
                        </h2>

                        <p className="text-sm text-slate-500 line-clamp-1">
                            {job.title}
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-slate-100"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Messages */}

                <div className="flex-1 overflow-y-auto p-5 space-y-4">

                    {messages.map((msg, index) => (

                        <ChatMessage
                            key={index}
                            role={msg.role}
                            content={msg.content}
                        />

                    ))}

                    {loading && (

                        <div className="flex items-center gap-2 text-slate-500">

                            <Loader2
                                className="animate-spin"
                                size={16}
                            />

                            Thinking...

                        </div>

                    )}

                    <div ref={bottomRef} />

                </div>

                {/* Input */}

                <div className="border-t p-4">

                    <div className="flex gap-2">

                        {/* <input
                            value={input}
                            disabled={loading}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Ask how to improve your resume..."
                            className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            disabled={loading}
                            onClick={sendMessage}
                            className="bg-blue-600 text-white rounded-lg px-4 hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button> */}
                        <ChatInput
                            value={input}
                            onChange={setInput}
                            onSend={sendMessage}
                            loading={loading}
                        />

                    </div>

                </div>

            </div>
        </div>
    );
}