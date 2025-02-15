'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Plus, Zap, Link2, FileText, MessageSquare, LifeBuoy, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

// Extract NewAgentDialog component
const NewAgentDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const CustomAgentForm = () => (
    <>
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-xl font-semibold">Create your own agent</h2>
        <p className="text-gray-500">
          Create and train your agent to automate your work across 7,000+ apps.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <div className="flex items-center gap-2 mt-1 p-2 border rounded-md">
            <Image src="/agentIcon.png" alt="Agent" width={20} height={20} />
            <Input 
              defaultValue="Untitled Agent"
              className="flex-1 bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        <Button className="w-full" variant="default">
          Start from scratch
        </Button>
      </div>
    </>
  );

  const TemplateView = () => (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-[#10B981] rounded p-1">
          <Image src="/agent-icon.png" alt="Agent" width={24} height={24} />
        </div>
        <h2 className="text-xl font-semibold">Support Email Agent</h2>
        <div className="flex items-center gap-1 text-gray-500">
          <span>•</span>
          <span>Zapier</span>
        </div>
      </div>

      <p className="text-lg mb-8">
        Get AI to draft customer replies using your knowledge base.
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Behaviors</h3>
          <p className="text-gray-500 mb-4">Workflows this agent will automate.</p>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg">Customer Question Auto-Reply Workflow</h4>
              <Image src="/gmailAgent.png" alt="Gmail" width={20} height={20} />
            </div>
            <p className="mb-4">
              When I get a new email, look at the contents and determine if it is a question 
              from a customer. If it's a customer question, look up the answer in [use "Find data" 
              to add a data source here]. If you find an answer to their question there,
            </p>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <Image src="/gmailAgent.png" alt="Gmail" width={20} height={20} />
              <span>Gmail: Create Draft Reply</span>
            </div>
            <p>
              to the customer in a direct, courteous tone with the correct answer. Please be succinct.
            </p>
            <p className="mt-4 text-gray-500">
              Important: Do not attempt to answer the question if you do not see a good answer in the attached data source. Do not make up answers.
            </p>
          </div>
        </div>

        <Button className="w-full" variant="default">
          Use this template
        </Button>
      </div>
    </>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="flex gap-6 h-[500px]">
          {/* Left side - Templates */}
          <div className="flex-1 space-y-4 p-6">
            <h2 className="text-xl font-semibold mb-6">New agent</h2>
            <div className="bg-[#f7f7f7] space-y-4 rounded-2xl p-4 border border-slate-200">
            

              <div>
                <h3 className="text-sm font-medium text-gray-500">Start from scratch</h3>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setSelectedTemplate('custom')}
                  >
                    Create a custom agent
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Use a template</h3>
                <div className="space-y-2 mt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setSelectedTemplate('support')}
                  >
                    Support Email Agent
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/gmailAgent.png" alt="Gmail" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Task Management Agent
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/linear.png" alt="Linear" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Travel Booking Assistant
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/phoneAgent.png" alt="Phone" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Presentation Creator
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-slate-200">
                        <Image src="/slidesAgent.png" alt="Slides" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Dynamic content */}
          <div className="flex-[1.3] border-l border-gray-200 flex flex-col px-32">
            {/* Sticky close button */}
            <div className="sticky top-0 bg-white p-6 flex justify-end">
              <DialogClose className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
            
            {/* Scrollable content */}
            <div className="px-6 overflow-y-auto flex-1">
              {selectedTemplate === 'custom' ? <CustomAgentForm /> : 
               selectedTemplate === 'support' ? <TemplateView /> : 
               <CustomAgentForm />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={165} 
                height={30}
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Navigation - updated */}
        <nav className="p-4 space-y-2">
          <NewAgentDialog 
            trigger={
              <Button className="w-full justify-start gap-3 bg-white text-black">
                <Plus size={20} />
                Add agent
              </Button>
            }
          />
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:bg-[#2A2A2A]">
            <Zap size={20} />
            Templates
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:bg-[#2A2A2A]">
            <Link2 size={20} />
            Integrations
          </Button>
        </nav>

        {/* Resize handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-800 hover:bg-blue-500"
          onMouseDown={startResizing}
        />
      </div>

      {/* Main content - updated */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-400 text-lg">You currently have no agents</p>
          <NewAgentDialog 
            trigger={
              <Button className="gap-2">
                <Plus className="h-5 w-5" />
                New agent
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
} 