import { ExternalLink, Github, Twitter } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="h-16 border-t border-[#e0e5f2] dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-[#4318ff] flex items-center justify-center">
          <span className="text-white text-xs font-medium">HZ</span>
        </div>
        <span className="text-sm text-[#1b2559] dark:text-white font-medium hidden sm:inline-block">Horizon AI</span>
        <Button variant="ghost" size="icon" className="h-6 w-6 hidden sm:flex">
          <ExternalLink className="h-4 w-4 text-[#718096] dark:text-gray-400" />
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-xs text-[#718096] dark:text-gray-400 hidden sm:inline-block">
          © 2023 Horizon UI AI模板。保留所有权利。
        </span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Github className="h-4 w-4 text-[#718096] dark:text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Twitter className="h-4 w-4 text-[#718096] dark:text-gray-400" />
          </Button>
        </div>
        <a 
          href="#" 
          className="text-xs text-[#718096] dark:text-gray-400 hover:text-[#4318ff] dark:hover:text-[#603cff] hidden md:inline-block"
        >
          隐私政策
        </a>
        <a 
          href="#" 
          className="text-xs text-[#718096] dark:text-gray-400 hover:text-[#4318ff] dark:hover:text-[#603cff] hidden md:inline-block"
        >
          使用条款
        </a>
      </div>
    </footer>
  );
} 