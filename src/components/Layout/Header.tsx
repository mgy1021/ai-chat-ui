import { Search, Bell, Settings, ChevronDown, User, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "../ThemeToggle";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="h-16 border-b border-[#e0e5f2] dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4 md:px-6">
      <div className="hidden md:block md:w-72">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] h-4 w-4" />
          <Input
            className="pl-10 bg-[#f4f7fe] dark:bg-gray-800 border-none h-9 text-sm rounded-full"
            placeholder="搜索内容或命令"
          />
        </div>
      </div>
      
      <div className="md:hidden flex items-center">
        <Button variant="ghost" size="icon" className="text-[#718096]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5 text-[#718096]" />
            <span className="absolute top-1 right-1 bg-red-500 h-2 w-2 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5 text-[#718096]" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[#4318ff] flex items-center justify-center">
            <span className="text-white text-sm font-medium">用户</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <span className="text-sm font-medium text-[#1b2559] dark:text-white">张三</span>
            <ChevronDown className="h-4 w-4 text-[#718096]" />
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-950 border-b border-[#e0e5f2] dark:border-gray-800 p-4 md:hidden z-50">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096] h-4 w-4" />
              <Input
                className="pl-10 bg-[#f4f7fe] dark:bg-gray-800 border-none h-9 text-sm rounded-full w-full"
                placeholder="搜索内容或命令"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-[#718096] dark:text-gray-400 font-medium">
              <Bell className="h-5 w-5 mr-2" />
              <span>通知</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#718096] dark:text-gray-400 font-medium">
              <Settings className="h-5 w-5 mr-2" />
              <span>设置</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#718096] dark:text-gray-400 font-medium">
              <User className="h-5 w-5 mr-2" />
              <span>个人资料</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
} 