import { useState, useEffect, useRef } from "react";
import { Message } from "./message";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";
import { Bot } from "lucide-react";

// 消息类型定义
interface MessageType {
  id: string;
  content: string;
  role: "user" | "assistant" | "thinking";
  timestamp: string;
  isStreaming?: boolean;
  thinkingContent?: string; // 添加思考内容字段
}

// 思考过程示例
const THINKING_PROCESSES = [
  "让我思考一下这个问题... 我需要考虑人工智能的几个方面来提供一个全面的回答。首先，我应该定义什么是AI及其关键组成部分。然后，我应该探索它在不同行业的应用。最后，我应该讨论一些人工智能技术的伦理考虑和未来方向。",
  
  "分析这个请求... 我需要有条理地分析机器学习和深度学习之间的区别。我应该先明确定义两个术语，然后比较它们的方法、数据需求、计算需求和典型应用。我还应该提到它们的相对优势和局限性，以提供一个平衡的视角。",
  
  "处理您的问题... 这需要我考虑自然语言处理的历史发展以及最近的突破。我应该解释传统NLP方法的工作原理，然后描述Transformer模型如何彻底改变了这个领域。我需要涵盖注意力机制、迁移学习和微调等关键概念，以提供一个完整的画面。",
];

// AI响应示例 - 带有更长文本的示例
const AI_RESPONSES = [
  "我是一个使用Horizon AI模板构建的AI助手。今天我能帮您什么吗？我可以提供各种主题的信息，协助创意任务，帮助解决问题，或者只是聊聊您想谈论的内容。请随时提问，我会尽力根据我的知识和能力提供有帮助的回答。",
  
  "这是一个关于人工智能的有趣问题。AI指的是模仿人类智能执行任务的系统或机器，它们可以根据收集的信息迭代地改进自身。AI是一个广泛的领域，包含许多不同的技术和方法，包括机器学习、深度学习、自然语言处理、计算机视觉和机器人学。AI的目标是创建能够感知环境、推理所感知的内容并采取行动以实现特定目标的系统。AI系统可以从简单的基于规则的系统到可以从大量数据中学习的复杂神经网络。近年来，该领域取得了显著进展，AI现在被用于医疗保健、金融、交通、娱乐等多个行业，解决复杂问题并增强人类能力。",
  
  "机器学习和深度学习之间的主要区别在于，机器学习算法解析数据，从数据中学习，然后应用所学内容做出明智的决策，而深度学习是机器学习的一个子集，它通过层次结构构造算法，创建一个人工神经网络，可以自行学习并做出智能决策。机器学习通常需要更多的人工干预来识别特征并进行修正，而深度学习则尝试模仿人脑，创建人工神经网络，可以在没有人类干预的情况下发现新特征和模式。深度学习通常需要比传统机器学习方法更多的数据和计算资源，但它可以在图像识别、自然语言处理和语音识别等许多复杂任务上取得最先进的结果。机器学习模型通常更简单，更易于解释，适用于许多业务应用，其中理解模型的决策过程很重要。另一方面，深度学习模型通常被认为是'黑盒'，因为其决策过程可能难以解释，但它们在处理非结构化数据和复杂模式方面表现出色。"
];

// 自定义滚动条样式
const scrollbarStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #e0e5f2;
    border-radius: 3px;
  }
  .dark .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #374151;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #c0c7d9;
  }
  .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #4b5563;
  }
`;

export function ChatContainer() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "您好！今天我能帮您什么忙吗？我随时准备回答您的问题或协助您完成任务。请随时提问，我会尽力提供有用的回答。",
      role: "assistant",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const lastScrollPositionRef = useRef(0);
  const scrollIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUserScrollingRef = useRef(false);

  // 增强的滚动函数，仅在自动滚动启用时滚动
  const scrollToBottom = () => {
    if (!autoScroll || isUserScrollingRef.current) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 当用户向上滚动时立即停止自动滚动
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 20; // 距离底部20px内

    // 检测滚动方向
    const isScrollingUp = scrollTop < lastScrollPositionRef.current;

    // 标记用户正在主动滚动
    isUserScrollingRef.current = true;

    // 清除任何现有的超时
    if (scrollIntervalRef.current) {
      clearTimeout(scrollIntervalRef.current);
    }

    // 设置超时，在100ms无滚动事件后标记滚动已完成
    scrollIntervalRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 100);

    // 如果在内容流式传输时向上滚动，立即禁用自动滚动
    if (isScrollingUp && streamingMessageId) {
      setAutoScroll(false);
    }

    // 如果在内容流式传输时处于底部，重新启用自动滚动
    if (isAtBottom && streamingMessageId) {
      setAutoScroll(true);
    }

    lastScrollPositionRef.current = scrollTop;
  };

  // 当消息变化或打字状态变化时滚动
  useEffect(() => {
    if (!isUserScrollingRef.current) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  // 设置滚动事件监听器，带有节流
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      let ticking = false;

      const throttledScrollHandler = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      container.addEventListener("scroll", throttledScrollHandler, { passive: true });
      return () => container.removeEventListener("scroll", throttledScrollHandler);
    }
  }, [streamingMessageId]);

  // 在流式传输期间设置滚动间隔
  useEffect(() => {
    if (streamingMessageId && autoScroll) {
      const interval = setInterval(() => {
        if (!isUserScrollingRef.current && autoScroll) {
          scrollToBottom();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [streamingMessageId, autoScroll]);

  const handleSendMessage = (content: string) => {
    // 发送新消息时重置自动滚动
    setAutoScroll(true);
    isUserScrollingRef.current = false;

    // 添加用户消息
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // 生成思考内容
    const thinkingProcess = THINKING_PROCESSES[Math.floor(Math.random() * THINKING_PROCESSES.length)];
    
    // 短暂延迟后添加AI响应消息，但先显示思考过程
    setTimeout(() => {
      setIsTyping(false);
      const messageId = `response-${Date.now()}`;
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // 创建包含思考内容的消息，但思考内容最初为空
      const aiMessage: MessageType = {
        id: messageId,
        content: "", // 最初为空，会在流式传输中填充
        role: "assistant",
        timestamp: timestamp,
        isStreaming: true,
        thinkingContent: "" // 最初思考内容为空
      };

      // 添加消息并开始流式传输
      setMessages((prev) => [...prev, aiMessage]);
      setStreamingMessageId(messageId);

      // 思考内容的流式传输
      let thinkingIndex = 0;
      const thinkingInterval = setInterval(() => {
        if (thinkingIndex < thinkingProcess.length) {
          thinkingIndex++;
          setMessages((prev) =>
            prev.map((msg) => 
              msg.id === messageId 
                ? { ...msg, thinkingContent: thinkingProcess.substring(0, thinkingIndex) } 
                : msg
            )
          );
        } else {
          clearInterval(thinkingInterval);
          
          // 思考完成后，延迟一会再开始显示答案
          setTimeout(() => {
            const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
            
            // 开始流式传输实际响应
            let responseIndex = 0;
            const responseInterval = setInterval(() => {
              if (responseIndex < randomResponse.length) {
                responseIndex++;
                setMessages((prev) =>
                  prev.map((msg) => 
                    msg.id === messageId 
                      ? { ...msg, content: randomResponse.substring(0, responseIndex) } 
                      : msg
                  )
                );
              } else {
                clearInterval(responseInterval);
                
                // 全部完成后，更新状态
                setTimeout(() => {
                  setMessages((prev) =>
                    prev.map((msg) => (msg.id === messageId ? { ...msg, isStreaming: false } : msg))
                  );
                  setStreamingMessageId(null);
                }, 500);
              }
            }, 15);
          }, 500);
        }
      }, 15);
    }, 1000);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="flex flex-col h-full relative">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#e0e5f2] dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-[#c0c7d9] dark:hover:scrollbar-thumb-gray-600 max-h-[calc(100vh-220px)]"
        >
          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.timestamp}
              isStreaming={message.isStreaming}
              thinkingContent={message.thinkingContent}
            />
          ))}

          {isTyping && (
            <div className="flex w-full gap-3 p-4 justify-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-[#4318ff] flex items-center justify-center text-white">
                  <Bot className="h-4 w-4" />
                </div>
              </div>
              <div className="flex flex-col max-w-[75%] items-start">
                <div className="rounded-lg px-4 py-2 text-sm bg-[#f4f7fe] dark:bg-gray-700 border border-[#e0e5f2] dark:border-gray-600">
                  <TypingIndicator />
                </div>
                <div className="text-xs text-[#718096] dark:text-gray-400 mt-1 flex items-center">
                  <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  <span className="mx-1">•</span>
                  <span>AI助手</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {!autoScroll && streamingMessageId && (
          <div className="absolute bottom-20 right-6">
            <button
              onClick={() => {
                setAutoScroll(true);
                isUserScrollingRef.current = false;
                scrollToBottom();
              }}
              className="bg-[#4318ff] text-white rounded-full p-2 shadow-lg hover:bg-[#603cff] transition-colors"
              aria-label="滚动到底部"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}

        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping || streamingMessageId !== null} 
        />
      </div>
    </>
  );
} 