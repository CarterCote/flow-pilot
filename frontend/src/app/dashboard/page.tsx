'use client';

import { useState } from 'react';
import { Home, Zap, Link2, FileText, MessageSquare, LifeBuoy } from 'lucide-react';

export default function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    // Prevent text selection while dragging
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newWidth = Math.max(200, Math.min(400, e.clientX));
      setSidebarWidth(newWidth);
    }
  };

  const stopResizing = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    // Restore text selection
    document.body.style.userSelect = '';
  };

  return (
    <div className="flex h-screen bg-[#1A1A1A] text-white">
      {/* Sidebar */}
      <div 
        className="relative bg-[#1A1A1A] border-r border-gray-800"
        style={{ width: sidebarWidth }}
      >
        {/* Logo area */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded"></div>
            <span className="font-medium">Cognosys</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button className="w-full px-4 py-2 rounded flex items-center gap-3 bg-[#2A2A2A] text-white">
            <Home size={20} />
            Home
          </button>
          <button className="w-full px-4 py-2 rounded flex items-center gap-3 text-gray-400 hover:bg-[#2A2A2A]">
            <Zap size={20} />
            Automations
          </button>
          <button className="w-full px-4 py-2 rounded flex items-center gap-3 text-gray-400 hover:bg-[#2A2A2A]">
            <Link2 size={20} />
            Integrations
          </button>
          <button className="w-full px-4 py-2 rounded flex items-center gap-3 text-gray-400 hover:bg-[#2A2A2A]">
            <FileText size={20} />
            Docs
          </button>
          <button className="w-full px-4 py-2 rounded flex items-center gap-3 text-gray-400 hover:bg-[#2A2A2A]">
            <MessageSquare size={20} />
            Feedback
          </button>
          <button className="w-full px-4 py-2 rounded flex items-center gap-3 text-gray-400 hover:bg-[#2A2A2A]">
            <LifeBuoy size={20} />
            Onboarding
          </button>
        </nav>

        {/* Resize handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-800 hover:bg-green-500"
          onMouseDown={startResizing}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-medium text-green-500 mb-2">Hi Carter,</h1>
        <h2 className="text-4xl font-medium text-green-500 mb-8">How can we help you today?</h2>

        {/* Content grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* First column */}
          <div className="space-y-6">
            <h3 className="text-xl font-normal">Seamlessly perform tasks between apps directly</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#2A2A2A] rounded-lg">
                <div className="w-8 h-8 bg-[#3A3A3A] rounded flex items-center justify-center">
                  <img src="/zoom-logo.svg" alt="Zoom" className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div>Zoom</div>
                  <div className="text-gray-400 text-sm">to read meetings</div>
                </div>
                <button className="px-4 py-1.5 bg-green-500 text-white rounded-md text-sm">Connect</button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#2A2A2A] rounded-lg">
                <div className="w-8 h-8 bg-[#3A3A3A] rounded flex items-center justify-center">
                  <img src="/linear-logo.svg" alt="Linear" className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div>Linear</div>
                  <div className="text-gray-400 text-sm">to read, create, and update issues</div>
                </div>
                <button className="px-4 py-1.5 bg-green-500 text-white rounded-md text-sm">Connect</button>
              </div>
            </div>
          </div>

          {/* Second column */}
          <div className="space-y-6">
            <h3 className="text-xl font-normal">Automate tasks by setting a schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex-1">Daily email summaries and priorities</div>
                <button className="w-8 h-8 bg-[#3A3A3A] rounded-full flex items-center justify-center text-green-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex-1">Personal daily news digest of the AI industry</div>
                <button className="w-8 h-8 bg-[#3A3A3A] rounded-full flex items-center justify-center text-green-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex-1">Weekly Business Newsletter</div>
                <button className="w-8 h-8 bg-[#3A3A3A] rounded-full flex items-center justify-center text-green-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Third column */}
          <div className="space-y-6">
            <h3 className="text-xl font-normal">Conduct in-depth research on topics you may be interested in</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex-1">Top Electric Vehicles in North America</div>
                <button className="w-8 h-8 bg-[#3A3A3A] rounded-full flex items-center justify-center text-green-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex-1">10-day Itinerary for Tokyo and Nearby Cities</div>
                <button className="w-8 h-8 bg-[#3A3A3A] rounded-full flex items-center justify-center text-green-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex-1">Business Model Canvas for Nike</div>
                <button className="w-8 h-8 bg-[#3A3A3A] rounded-full flex items-center justify-center text-green-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 