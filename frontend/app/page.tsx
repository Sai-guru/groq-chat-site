"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    Array<{ prompt: string; reply: string }>
  >([]);
  const replyStartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading && replyStartRef.current) {
      requestAnimationFrame(() => {
        replyStartRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [loading, reply, history.length]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

      if (!backendBaseUrl) {
        throw new Error("NEXT_PUBLIC_BACKEND_BASE_URL is not configured");
      }

      const res = await axios.post(`${backendBaseUrl}/chat`,{ userInput: prompt },
        { headers: { 
          "Content-Type": "application/json" 
        } },
      );

      if (!res.data) throw new Error("Backend request failed");
      

      const responseMessage = res.data.message ?? "No reply returned from backend.";
      setReply(responseMessage);
      setHistory((prev) => [{ prompt, reply: responseMessage }, ...prev]);
      setPrompt("");
    } catch {
      setReply("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setReply("");
    setHistory([]);
  };

  const renderMarkdown = (text: string) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
  );

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-badge">Groq powered</div>
        <h1 className="hero-title">Groq AI Chat</h1>
        <p className="hero-subtitle">
          Focused, fast answers with a crisp interface built for flow.
        </p>
      </section>

      <section className="chat-card">
        <div className="chat-header">
          <div>
            <h2 className="chat-title">Ask anything</h2>
            <p className="chat-subtitle">
              One prompt at a time. Clear to reset.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            disabled={loading || (!reply && !prompt)}
            className="ghost-button"
          >
            Clear
          </button>
        </div>

        {history.length > 0 && (
          <div className="history">
            {history.map((item, index) => (
              <div key={`${index}-${item.prompt}`} className="history-item">
                <p className="history-prompt">You: {item.prompt}</p>
                <div className="history-reply">
                  <span className="history-reply-label">AI</span>
                  <div className="history-reply-body markdown">
                    {renderMarkdown(item.reply)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="chat-form">
          <div className="input-wrap">
            <input
              className="chat-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask something..."
            />
            <button disabled={loading} className="send-button">
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
          <div className="form-meta">
            <span>{prompt.length ? `${prompt.length} chars` : ""}</span>
            <span>{loading ? "Groq is thinking..." : ""}</span>
          </div>
        </form>

        {reply && (
          <div className="reply-card">
            <div ref={replyStartRef} />
            <div className="reply-label">AI</div>
            <div className="reply-body markdown">{renderMarkdown(reply)}</div>
          </div>
        )}
      </section>
    </main>
  );
}
