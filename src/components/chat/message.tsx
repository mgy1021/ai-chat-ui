import { Bot, User, Brain, LightbulbIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

export interface MessageProps {
  content: string;
  role: "user" | "assistant" | "thinking";
  timestamp: string;
  isStreaming?: boolean;
  thinkingContent?: string;
}

export function Message({ content, role, timestamp, isStreaming = false, thinkingContent }: MessageProps) {
  const isUser = role === "user";
  const isThinking = role === "thinking";
  const hasThinking = !!thinkingContent && role === "assistant";
  const isThinkingStreaming = isStreaming && !content && !!thinkingContent;
  
  // 流式打字效果
  const [displayedText, setDisplayedText] = useState(isUser || !isStreaming ? content : "");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isUser || !isStreaming) {
      setDisplayedText(content);
      return;
    }

    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedText(content.substring(0, currentIndex + 1));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 15); // 调整打字速度

      return () => clearTimeout(timer);
    }
  }, [content, currentIndex, isUser, isStreaming]);
  
  return (
    <div className={`flex w-full gap-3 p-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${
            isThinking ? "bg-[#718096]" : "bg-[#4318ff]"
          }`}>
            {isThinking ? <Brain className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </div>
        </div>
      )}

      <div className={`flex flex-col max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-lg shadow-sm ${
            isUser
              ? "bg-gradient-to-r from-[#4318ff] to-[#603cff] text-white"
              : "bg-white dark:bg-gray-800 border border-[#e0e5f2] dark:border-gray-700 text-[#1b2559] dark:text-white"
          } overflow-hidden`}
        >
          {hasThinking && (
            <div className="bg-[#f9fafc] dark:bg-gray-850 border-b border-[#e0e5f2] dark:border-gray-700 p-3">
              <div className="flex items-center mb-2">
                <div className={`p-1 rounded-full bg-[#f2efff] dark:bg-[#603cff]/20 mr-2 ${isThinkingStreaming ? 'animate-pulse' : ''}`}>
                  <Brain className="h-3 w-3 text-[#603cff]" />
                </div>
                <span className="text-xs font-medium text-[#1b2559] dark:text-white">思考过程</span>
                {isThinkingStreaming && (
                  <div className="ml-2 flex items-center">
                    <span className="w-1 h-1 bg-[#603cff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="mx-0.5 w-1 h-1 bg-[#603cff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1 h-1 bg-[#603cff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                )}
              </div>
              <div className="text-xs italic text-[#718096] dark:text-gray-400 pl-2 border-l-2 border-[#e0e5f2] dark:border-gray-700">
                {thinkingContent}
                {isThinkingStreaming && (
                  <span className="inline-block w-1 h-4 ml-0.5 animate-pulse bg-[#603cff]" />
                )}
              </div>
            </div>
          )}
          
          {!isUser && !isThinking && content && (
            <div className="p-3">
              <div className="flex items-center mb-2">
                <div className="p-1 rounded-full bg-[#f2efff] dark:bg-[#603cff]/20 mr-2">
                  <LightbulbIcon className="h-3 w-3 text-[#603cff]" />
                </div>
                <span className="text-xs font-medium text-[#1b2559] dark:text-white">回答</span>
              </div>
              <div className="text-sm pl-2 border-l-2 border-[#4318ff] dark:border-[#603cff]">
                {isUser || !isStreaming ? content : displayedText}
                {!isUser && isStreaming && currentIndex < content.length && (
                  <span className="inline-block w-1 h-4 ml-0.5 animate-pulse bg-[#4318ff]" />
                )}
              </div>
            </div>
          )}
          
          {(isUser || isThinking) && (
            <div className="p-3">
              {isUser || !isStreaming ? content : displayedText}
              {!isUser && isStreaming && currentIndex < content.length && (
                <span className={`inline-block w-1 h-4 ml-0.5 animate-pulse ${isThinking ? "bg-[#718096]" : "bg-[#4318ff]"}`} />
              )}
            </div>
          )}
        </div>

        <div className="text-xs text-[#718096] dark:text-gray-400 mt-1 flex items-center">
          <span>{timestamp}</span>
          <span className="mx-1">•</span>
          <span>{isUser ? "您" : isThinking ? "思考中..." : "AI助手"}</span>
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#4318ff] to-[#603cff] flex items-center justify-center text-white">
            <User className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
} 