import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 调整文本区域的高度以适应内容
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 200); // 最大高度为200px
    textarea.style.height = `${newHeight}px`;
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      // 重置文本区域高度
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-[#e0e5f2] dark:border-gray-800 bg-white dark:bg-gray-950 p-4"
    >
      <div className="relative flex items-end rounded-lg border border-[#e0e5f2] dark:border-gray-800 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-[#4318ff] focus-within:ring-opacity-50 transition-all">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          disabled={disabled}
          className="min-h-[40px] max-h-[200px] w-full resize-none bg-transparent py-3 px-4 outline-none text-[#1b2559] dark:text-white placeholder:text-[#718096] dark:placeholder:text-gray-400"
          rows={1}
        />
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="mb-2 mr-2 bg-[#4318ff] hover:bg-[#603cff] text-white rounded-md h-8 px-3 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
} 