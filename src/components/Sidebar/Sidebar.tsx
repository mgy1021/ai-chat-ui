import { MessageSquare, LayoutGrid, FileText, MoreHorizontal, Folder, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState, useEffect } from "react";

// 导航项类型定义
interface NavItem {
  icon: React.ReactNode;
  label: string;
  isNew?: boolean;
  isActive?: boolean;
  subItems?: SubNavItem[];
}

// 子导航项类型定义
interface SubNavItem {
  label: string;
}

// 导航分组类型定义
interface NavSection {
  title: string;
  items: NavItem[];
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  
  // 导航数据
  const navData: NavSection[] = [
    {
      title: "",
      items: [
        {
          icon: <MessageSquare className="h-4 w-4" />,
          label: "Chat UI",
          isActive: true
        }
      ]
    },
    {
      title: "MAIN",
      items: [
        {
          icon: <LayoutGrid className="h-4 w-4" />,
          label: "My Projects",
          isNew: true
        },
        {
          icon: <FileText className="h-4 w-4" />,
          label: "Templates",
          isNew: true
        },
        {
          icon: <MoreHorizontal className="h-4 w-4" />,
          label: "Other Pages",
          isNew: true,
          subItems: [
            { label: "Pricing Page" },
            { label: "404" },
            { label: "500" }
          ]
        }
      ]
    },
    {
      title: "EXTRA",
      items: [
        {
          icon: <Folder className="h-4 w-4" />,
          label: "Other Pages",
          isNew: true,
          subItems: [
            { label: "Documentation" },
            { label: "License" },
            { label: "Changelog" },
            { label: "Special Thanks" }
          ]
        }
      ]
    }
  ];
  
  // 检测窗口尺寸并在小屏幕上自动折叠侧边栏
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    // 初始化时检查一次
    handleResize();

    // 添加窗口大小改变事件监听器
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="relative h-full">
      <div className={`${collapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-64 opacity-100'} bg-white dark:bg-gray-950 border-r border-[#e0e5f2] dark:border-gray-800 flex flex-col h-full transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="h-16 border-b border-[#e0e5f2] dark:border-gray-800 flex items-center px-6 overflow-hidden">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-text-primary dark:text-white font-bold whitespace-nowrap">
              HORIZON AI FREE
            </span>
          </div>
        </div>

        <div className="flex-1 py-4 overflow-auto">
          {navData.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className={`px-4 ${sectionIndex === 0 ? 'mb-4' : 'mb-1'}`}>
              {section.title && (
                <div className="text-xs font-medium text-text-secondary mb-2 px-3">
                  {section.title}
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <React.Fragment key={`item-${sectionIndex}-${itemIndex}`}>
                    <NavItemWithTooltip
                      icon={item.icon}
                      label={item.label}
                      isNew={item.isNew}
                      isActive={item.isActive}
                    />
                    {item.subItems && !collapsed && item.subItems.map((subItem, subIndex) => (
                      <SubNavItemComponent 
                        key={`subitem-${sectionIndex}-${itemIndex}-${subIndex}`} 
                        label={subItem.label} 
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <div className="bg-[#f2efff] dark:bg-[#603cff]/20 rounded-xl p-4">
            <div className="flex justify-center mb-2">
              <div className="h-10 w-10 rounded-full bg-[#603cff] flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>

            <h3 className="text-sm font-semibold text-center text-text-primary dark:text-white mb-1">
              Go unlimited with PRO
            </h3>

            <p className="text-xs text-center text-text-secondary dark:text-gray-300 mb-3">
              Get your PRO features to unlock
              <br />
              unlimited usage and gain access to
              <br />
              Horizon AI Template PRO.
            </p>

            <Button className="w-full bg-[#603cff] hover:bg-[#4318ff] text-white text-xs h-8">
              Get started with PRO
            </Button>
          </div>
        </div>
      </div>

      {/* 折叠/展开按钮放在分割线中 */}
      <div 
        className={`absolute top-20 transition-all duration-300 ease-in-out ${
          collapsed ? 'left-0' : 'left-64'
        } -ml-3 z-20`}
      >
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-white dark:bg-gray-900 border border-[#e0e5f2] dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3 text-[#718096]" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-[#718096]" />
          )}
        </button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isNew?: boolean;
  isActive?: boolean;
}

function NavItemWithTooltip({ icon, label, isNew = false, isActive = false }: NavItemProps) {
  return (
    <div className="relative group/item">
      <Button 
        variant="ghost" 
        className={`w-full justify-between px-3 ${isActive ? 'bg-[#f2efff] dark:bg-[#603cff]/20 text-[#603cff]' : 'text-text-secondary dark:text-gray-400'} font-medium h-9 hover:bg-[#f2efff] dark:hover:bg-[#603cff]/10 hover:text-[#603cff] transition-all duration-200`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-5 w-5">{icon}</div>
          <span className="text-sm">{label}</span>
        </div>
        {isNew && (
          <span className="text-[10px] font-bold bg-[#f2efff] dark:bg-[#603cff]/30 text-[#603cff] px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}
      </Button>
    </div>
  );
}

function SubNavItemComponent({ label }: SubNavItem) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-text-secondary dark:text-gray-400 font-medium h-8 pl-11 pr-3 hover:bg-[#f2efff] dark:hover:bg-[#603cff]/10 hover:text-[#603cff] transition-all duration-200"
    >
      <span className="text-sm">{label}</span>
    </Button>
  );
}
