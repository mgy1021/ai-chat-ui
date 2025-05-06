import { ChatContainer } from "../chat/chat-container";

export default function Main() {
  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-[#f2efff] dark:bg-[#603cff]/20 text-[#603cff] px-2 py-1 rounded-md text-xs font-medium">
            <span>GPT-3.5</span>
          </div>
          <div className="flex items-center gap-1 bg-[#f4f7fe] dark:bg-gray-800 text-[#718096] dark:text-gray-400 px-2 py-1 rounded-md text-xs font-medium">
            <span>GPT-4</span>
          </div>
          <div className="text-xs text-[#718096] dark:text-gray-400 ml-2">未启用插件</div>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-sm overflow-hidden flex-1">
          <ChatContainer />
        </div>
      </div>
    </main>
  );
} 