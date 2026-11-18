import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, BrainCircuit, CornerDownRight, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "As-salamu alaykum! I am Raiyan's AI Portfolio Representative. Ask me anything about his credentials, projects, custom skills, or let me draft an outreach email/cover letter for you!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "What certificates does Raiyan have?",
    "Tell me about the 'Lower Your Gaze' project.",
    "Draft a formal consulting proposal email",
    "What is Raiyan's core Firebase expertise?"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Fetch response from server-side Express Gemini endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.filter(m => m.id !== 'welcome')
        }),
      });

      if (!response.ok) {
        throw new Error('API server returned error status.');
      }

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "I encountered an empty answer. How else can I assist you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        text: "System Note: Failed to transmit message to server API. Falling back to local offline suggestions. Please verify your internet connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 shadow-2xl hover:scale-105 active:scale-95 transition-all text-white cursor-pointer group border border-cyan-400/20"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
          </div>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 text-cyan-300 text-[10px] font-mono px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Chat with Raiyan AI
          </span>
        </button>
      )}

      {/* Floating Chat Drawer overlay */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-85 md:w-96 h-[500px] z-50 glass-card rounded-2xl border-cyan-500/30 glow-cyan flex flex-col justify-between overflow-hidden shadow-2xl animate-fade-in-up">
          
          {/* Chat Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25">
                <BrainCircuit className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold font-display text-white">Raiyan AI Copilot</h4>
                <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Gemini 3.5 Live Active
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] text-left ${
                  msg.sender === 'user'
                    ? 'ml-auto items-end'
                    : msg.sender === 'system'
                    ? 'mx-auto items-center'
                    : 'items-start'
                }`}
              >
                {/* Meta details */}
                <span className="text-[9px] font-mono text-slate-500 mb-1 px-1">
                  {msg.sender === 'user' ? 'You' : msg.sender === 'system' ? 'System Status' : 'AI Assistant'} • {msg.timestamp}
                </span>

                {/* Message Balloon */}
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed font-sans relative group ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500/10 text-cyan-100 rounded-tr-none border border-cyan-500/20'
                      : msg.sender === 'system'
                      ? 'bg-red-500/10 text-red-300 border border-red-500/20 text-center rounded-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap select-text">{msg.text}</p>

                  {/* Copy Button for code blocks/responses */}
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="absolute top-1.5 right-1.5 p-1 rounded bg-slate-950/80 hover:bg-slate-950 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-slate-800"
                      title="Copy content"
                    >
                      {copiedTextId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Simulated typing dot loader */}
            {loading && (
              <div className="flex flex-col items-start max-w-[80%] text-left">
                <span className="text-[9px] font-mono text-slate-500 mb-1 px-1">AI Assistant is typing...</span>
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions block (Only shown when there aren't too many messages) */}
          {messages.length < 3 && (
            <div className="p-3 bg-slate-900/60 border-t border-slate-900 space-y-1.5 text-left">
              <span className="text-[9px] font-mono uppercase text-slate-500 block px-1">Quick Suggestions</span>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSendMessage(sug)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300 hover:text-white bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/20 px-2 py-1 rounded-md transition-all cursor-pointer"
                  >
                    <CornerDownRight className="w-3 h-3 text-cyan-400" />
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input Footer */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(input);
              }}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg p-2 text-xs font-sans text-white focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-cyan-400/50 cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
