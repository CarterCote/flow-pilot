'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Plus, Zap, Link2, X, ArrowRight, Check } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

const TEMPLATES = {
  'support': {
    icon: '/gmailAgent.png',
    title: 'Support Email Agent',
    integration: 'Zapier',
    description: 'Get AI to draft customer replies using your knowledge base.',
    workflowTitle: 'Customer Question Auto-Reply Workflow',
    workflowDescription: `When I get a new email, look at the contents and determine if it is a question 
      from a customer. If it's a customer question, look up the answer in [use "Find data" 
      to add a data source here]. If you find an answer to their question there,`,
    actionIcon: '/gmailAgent.png',
    actionText: 'Gmail: Create Draft Reply',
    actionDescription: `to the customer in a direct, courteous tone with the correct answer. Please be succinct.`,
  },
  'task': {
    icon: '/linear.png',
    title: 'Task Management Agent',
    integration: 'Linear',
    description: 'Automatically create and assign tasks based on conversations.',
    workflowTitle: 'Meeting Notes to Tasks Workflow',
    workflowDescription: `When a meeting ends in Zoom, analyze the meeting transcript and identify 
      action items. For each action item detected, create a new task with the relevant details and context.`,
    actionIcon: '/linear.png',
    actionText: 'Linear: Create Task',
    actionDescription: `with appropriate title, description, and assignee based on the meeting context.`,
  },
  'travel': {
    icon: '/phoneAgent.png',
    title: 'Travel Booking Assistant',
    integration: 'Zoom',
    description: 'Schedule and manage travel arrangements from meeting discussions.',
    workflowTitle: 'Meeting Travel Planning Workflow',
    workflowDescription: `When travel plans are discussed in a Zoom meeting, analyze the conversation 
      to identify destination, dates, and preferences. Create a travel itinerary proposal based on 
      the discussed requirements and company travel policies.`,
    actionIcon: '/phoneAgent.png',
    actionText: 'Travel: Create Booking Request',
    actionDescription: `with flight options, hotel recommendations, and estimated costs based on the discussed preferences.`,
  },
  'presentation': {
    icon: '/slidesAgent.png',
    title: 'Presentation Creator',
    integration: 'Google Slides',
    description: 'Automatically generate presentation slides from meeting content.',
    workflowTitle: 'Meeting to Slides Workflow',
    workflowDescription: `When a meeting recording is available, analyze the transcript to identify 
      key points, decisions, and action items. Structure the content into a logical presentation 
      format with clear sections and highlights.`,
    actionIcon: '/slidesAgent.png',
    actionText: 'Slides: Create Presentation',
    actionDescription: `with a professional layout, key talking points, and relevant data visualizations from the meeting content.`,
  }
};

// Extract NewAgentDialog component
const NewAgentDialog = ({ 
  trigger, 
  onAgentCreate 
}: { 
  trigger: React.ReactNode;
  onAgentCreate: (name: string, icon: string) => void;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleCreateAgent = (name: string, icon: string) => {
    onAgentCreate(name, icon);
    // Close the dialog here
  };

  const CustomAgentForm = () => {
    const [agentName, setAgentName] = useState("");
    
    return (
      <>
        <div className="h-12 w-full"/>
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl font-semibold">Create your own agent</h2>
          <p className="text-zinc-500">
            Create and train your agent to automate your work across 7,000+ apps.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <div className="flex items-center gap-2 mt-1 p-2 border rounded-xl">
              <Image src="/agentIcon.png" alt="Agent" width={20} height={20} />
              <Input 
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Untitled agent"
                className="flex-1 bg-transparent border-none focus:outline-none"
              />
            </div>
          </div>

          <Button 
            className="w-full bg-black text-white" 
            variant="secondary"
            onClick={() => handleCreateAgent(agentName, "/agentIcon.png")}
          >
            Start from scratch
          </Button>
        </div>
      </>
    );
  };

  const TemplateView = ({ templateId }: { templateId: string }) => {
    const [showConnection, setShowConnection] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const template = TEMPLATES[templateId as keyof typeof TEMPLATES];
    if (!template) return null;

    const handleConnect = async () => {
      setIsConnecting(true);
          setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
          }, 1500);
      
      // try {
      //   // Choose the appropriate handler based on the template
      //   if (templateId === 'support') {
      //     await handleGoogleConnect();
      //   } else if (templateId === 'task') {
      //     await handleZoomConnect();
      //   } else {
      //     // Default connection simulation
      //     setTimeout(() => {
      //       setIsConnecting(false);
      //       setIsConnected(true);
      //     }, 1500);
      //   }
      // } catch (error) {
      //   console.error('Failed to connect:', error);
      //   setIsConnecting(false);
      // }
    };

    if (showConnection) {
      return (
        <div className="px-4">
          <div className="h-12 w-full"/>
          <h2 className="text-2xl font-semibold mb-2">Let&apos;s start by connecting your apps</h2>
          <p className="text-zinc-500 text-lg mb-8">
            Connecting your apps allows this agent to run actions and access your data.
          </p>

          <div className="bg-zinc-50 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/zoomAgent.png" alt="Zoom" width={24} height={24} />
                <span className="text-lg">Zoom</span>
              </div>
              <Button 
                variant="default" 
                className={`text-white ${isConnected ? 'bg-blue-600 hover:bg-blue-600' : 'bg-[#4F46E5] hover:bg-[#4338CA]'}`}
                onClick={handleConnect}
                disabled={isConnecting || isConnected}
              >
                {isConnecting ? (
                  <>
                    <span className="animate-spin mr-2">⭘</span>
                    Connecting...
                  </>
                ) : isConnected ? (
                  <>
                    <span className="mr-2">✓</span>
                    Connected
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Skip</Button>
            <DialogClose asChild>
              <Button 
                className="bg-black text-white" 
                onClick={() => handleCreateAgent(template.title, template.icon)}
              >
                Create
              </Button>
            </DialogClose>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="h-12 w-full"/>

        <div className="flex items-center gap-2 mb-4">
          <div className="rounded p-1">
            <Image src={template.icon} alt="Agent" width={24} height={24} />
          </div>
          <h2 className="text-xl font-semibold">{template.title}</h2>
          <div className="flex items-center gap-1 text-zinc-500">
            <span>•</span>
            <span>{template.integration}</span>
          </div>
        </div>

        <p className="text-lg mb-8">
          {template.description}
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Behaviors</h3>
            <p className="text-zinc-500 mb-4">Workflows this agent will automate.</p>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg">{template.workflowTitle}</h4>
                <Image src={template.icon} alt="App" width={20} height={20} />
              </div>
              <p className="mb-4">
                {template.workflowDescription}
              </p>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <Image src={template.actionIcon} alt="App" width={20} height={20} />
                <span>{template.actionText}</span>
              </div>
              <p>
                {template.actionDescription}
              </p>
              <p className="mt-4 text-zinc-500">
                Important: Do not attempt to answer the question if you do not see a good answer in the attached data source. Do not make up answers.
              </p>
            </div>
          </div>

          <Button 
            className="w-full" 
            variant="secondary"
            onClick={() => setShowConnection(true)}
          >
            Use this template
          </Button>

          <div className="h-8 w-full"/>

        </div>
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1080px] p-0">
        <div className="flex gap-6 h-[500px]">
          {/* Left side - Templates */}
          <div className="flex-1 space-y-4 p-6">
            <h2 className="text-xl font-semibold mb-6">New agent</h2>
            <div className="bg-[#f7f7f7] space-y-4 rounded-2xl p-4 border border-zinc-200">
            
              <div>
                <h3 className="text-sm font-medium text-zinc-500">Start from scratch</h3>
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
                <h3 className="text-sm font-medium text-zinc-500">Use a template</h3>
                <div className="space-y-2 mt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setSelectedTemplate('support')}
                  >
                    Support Email Agent
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/gmailAgent.png" alt="Gmail" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setSelectedTemplate('task')}
                  >
                    Task Management Agent
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/linear.png" alt="Linear" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setSelectedTemplate('travel')}
                  >
                    Travel Booking Assistant
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/phoneAgent.png" alt="Phone" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setSelectedTemplate('presentation')}
                  >
                    Presentation Creator
                    <div className="flex gap-1">
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                      </div>
                      <div className="bg-white rounded-[6px] p-[2px] border border-zinc-200">
                        <Image src="/slidesAgent.png" alt="Slides" width={20} height={20} />
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Dynamic content */}
          <div className="flex-[1.3] border-l border-zinc-200 h-[500px] relative">
            {/* Scrollable content container */}
            <div className="px-12 overflow-y-auto h-full">
              {/* Close button positioned absolutely */}
              <div className="absolute top-6 right-6">
                <DialogClose className="rounded-full p-2 hover:bg-zinc-100">
                  <X className="h-4 w-4" />
                </DialogClose>
              </div>
              
              {selectedTemplate === 'custom' ? <CustomAgentForm /> : 
               selectedTemplate === 'support' ? <TemplateView templateId='support' /> : 
               selectedTemplate === 'task' ? <TemplateView templateId='task' /> : 
               selectedTemplate === 'travel' ? <TemplateView templateId='travel' /> : 
               selectedTemplate === 'presentation' ? <TemplateView templateId='presentation' /> : 
               <CustomAgentForm />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add this type near the top of the file
type Agent = {
  id: string;
  name: string;
  icon: string;
};

// Add this new component after the NewAgentDialog component
const IntegrationsDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Integrations</h2>
          <DialogClose className="rounded-full p-2 hover:bg-zinc-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-200 p-4 rounded-xl border border-zinc-300">
            <div className="flex items-center gap-3">
              <Image src="/zoomAgent.png" alt="Zoom" width={24} height={24} />
              <div>
                <div className="text-zinc-500 font-medium">
                  <span className="text-black font-bold">Zoom</span> to read documents
                </div>
                <div className="text-zinc-500">and transcribe meetings</div>
              </div>
            </div>
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-600/80 text-white"
              onClick={() => {}}
            >
              Connect
            </Button>
          </div>

          <div className="flex items-center justify-between bg-zinc-200 p-4 rounded-xl border border-zinc-300">
            <div className="flex items-center gap-3">
              <Image src="/notionLogo.png" alt="Notion" width={24} height={24} />
              <div>
                <div className="text-zinc-500 font-medium">
                  <span className="text-black font-bold">Notion</span> to read documents
                </div>
                <div className="text-zinc-500">and manage knowledge bases</div>
              </div>
            </div>
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-600/80 text-white"
              onClick={() => {}}
            >
              Connect
            </Button>
          </div>

          <div className="flex items-center justify-between bg-zinc-200 p-4 rounded-xl border border-zinc-300">
            <div className="flex items-center gap-3">
              <Image src="/gmailAgent.png" alt="Gmail" width={24} height={24} />
              <div>
                <div className="text-zinc-500 font-medium">
                  <span className="text-black font-bold">Gmail</span> to read and draft emails
                </div>
                <div className="text-zinc-500">and manage your inbox</div>
              </div>
            </div>
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-600/80 text-white"
              onClick={() => {}}
            >
              Connect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add these types
type TaskMetadata = {
  transcript: string;
};

// Update the Task type to include an id and status
type Task = {
  id: string;
  task: string;
  tool: string;
  metadata: TaskMetadata;
  status: 'pending' | 'accepted' | 'rejected';
};

export default function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [expanded, setExpanded] = useState<string | null>(null);

  // Replace the static tasks array with state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      task: "Discuss with team to finalize configuration details for the local model and its transcription capabilities",
      tool: "notion",
      metadata: {
        transcript: "[8:57:58 PM] stop and then starts recording\n[8:58:04 PM]  right and you\"re saying that it doesn\"t make sense because we don\"t want it to record as soon as you start start the meeting\n[8:58:08 PM]  I care\n[8:58:13 PM]  I\"m thinking about how to replace it\n[8:58:28 PM]  cuz we don\"t need to host this on on a URL this is not supposed to be hosted this is a zoom application\n[8:58:34 PM]  and then we cannot confuse about his dad\n[8:58:43 PM]  don\"t you want to have like some sort of like trigger to start these in a meeting either through Blaine or either runtime yourself\n[8:58:51 PM]  I mean when you start a meeting you\"re probably going to leave for the meeting now and as soon as you join everything will start\n[8:58:55 PM]  well I\"m so confused\n[8:59:03 PM]  no I mean that\"s that\"s like something that should be done\n[8:59:10 PM]  like what promise you to give you the idea of getting another endpoint\n[8:59:25 PM] ? cuz\n[8:59:32 PM]  even if your ass is zoom guy the Zumba I will tell you that there is no way for you to like actually post\n[8:59:38 PM]  this online cuz it\"s a you know this is a local model\n[8:59:47 PM]  serving your transcriptions right yeah so if you do put it online then there will be no way for them to actually start transcribing us as well as it is right now\n[8:59:55 PM]  yeah but I don\"t know I still don\"t follow\n[9:00:10 PM]  I do I do have a buck here though\n"
      },
      status: 'pending'
    },
    {
      id: '2',
      task: "Set up local hosting for the meeting on port 9202",
      tool: "notion",
      metadata: {
        transcript: "[9:05:15 PM] looks nothing like Zoom right\n[9:05:20 PM]  this also means that you\"re not no one else is able to join this meeting as well\n[9:05:23 PM]  it\"s just one person it\"s a one way\n[9:05:29 PM]  so yeah this is like the only way that we can host the zoo\n[9:05:50 PM]  no no it\"s bro ignore that ignore that\n[9:06:00 PM]  like that that\"s like for the action items but I was like wanting to like join the meeting from the phone app and then from there to combine like summarize the meeting\n[9:06:08 PM]  you can do that what you can do is you run this locally on your thing and then you just prompt local hosting on 9202\n[9:06:10 PM]  yeah\n[9:06:12 PM]  I\"ll get that set up for you afterwards\n[9:06:18 PM]  okay this is the problem do you see this\n"
      },
      status: 'pending'
    },
    {
      id: '3',
      task: "Set up local hosting on port 9202 for the meeting application",
      tool: "notion",
      metadata: {
        transcript: "[9:05:15 PM] looks nothing like Zoom right\n[9:05:20 PM]  this also means that you\"re not no one else is able to join this meeting as well\n[9:05:23 PM]  it\"s just one person it\"s a one way\n[9:05:29 PM]  so yeah this is like the only way that we can host the zoo\n[9:05:50 PM]  no no it\"s bro ignore that ignore that\n[9:06:00 PM]  like that that\"s like for the action items but I was like wanting to like join the meeting from the phone app and then from there to combine like summarize the meeting\n[9:06:08 PM]  you can do that what you can do is you run this locally on your thing and then you just prompt local hosting on 9202\n[9:06:10 PM]  yeah\n[9:06:12 PM]  I\"ll get that set up for you afterwards\n[9:06:18 PM]  okay this is the problem do you see this\n"
      },
      status: 'pending'
    }
  ]);

  // Filter out rejected tasks and show all others
  const visibleTasks = tasks.filter(task => task.status !== 'rejected');

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

  const handleAgentCreation = (name: string, icon: string) => {
    const newAgent = {
      id: crypto.randomUUID(),
      name,
      icon,
    };
    setAgents(prev => [...prev, newAgent]);
    setSelectedAgent(newAgent); // Select the newly created agent
  };

  const ConfigView = ({ agent }: { agent: Agent }) => {
    return (
      <div className="px-8 pb-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label className="text-base">Name</Label>
            <div className="flex items-center gap-2 p-2 border border-zinc-700 rounded-xl bg-zinc-800">
              <Image src={agent.icon} alt="Agent" width={20} height={20} />
              <Input 
                value={agent.name}
                className="flex-1 bg-transparent border-none focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Description</Label>
            <Input 
              placeholder="Add a short description about what this agent does"
              className="bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Data sources</Label>
                <p className="text-sm text-zinc-500">Real-time data this agent has access to.</p>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <Label className="text-base">Behaviors</Label>
              <p className="text-sm text-zinc-500">Workflows this agent will automate.</p>
            </div>
            <div className="bg-zinc-50 rounded-lg p-8 flex flex-col items-center justify-center gap-2">
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                Create behavior
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Left Sidebar */}
      <div 
        className="relative bg-black border-r border-zinc-800"
        style={{ width: sidebarWidth }}
      >
        {/* Logo area */}
        <div className="p-4 border-b border-zinc-800">
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
            onAgentCreate={handleAgentCreation}
          />
          {agents.map(agent => (
            <Button
              key={agent.id}
              variant="ghost"
              className={`w-full justify-start gap-3 ${
                selectedAgent?.id === agent.id 
                  ? 'bg-[#2A2A2A] text-white' 
                  : 'text-zinc-400 hover:bg-[#2A2A2A]'
              }`}
              onClick={() => setSelectedAgent(agent)}
            >
              <Image src={agent.icon} alt={agent.name} width={20} height={20} />
              {agent.name}
            </Button>
          ))}
          <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:bg-[#2A2A2A] hover:text-white">
            <Zap size={20} />
            Templates
          </Button>
          <IntegrationsDialog 
            trigger={
              <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:bg-[#2A2A2A] hover:text-white">
                <Link2 size={20} />
                Integrations
              </Button>
            }
          />
        </nav>

        {/* Resize handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-zinc-800 hover:bg-blue-600"
          onMouseDown={startResizing}
        />
      </div>

      {/* Main content area */}
      {selectedAgent ? (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <div className="border-b border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <Image src={selectedAgent.icon} alt={selectedAgent.name} width={24} height={24} />
                <h2 className="font-medium text-white">{selectedAgent.name}</h2>
              </div>
              <div className="flex items-center gap-2 bg-zinc-700 rounded-xl p-1.5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-zinc-400 ${activeTab === 'configure' ? 'bg-zinc-100 text-black' : ''}`}
                  onClick={() => {
                    setActiveTab('configure');
                  }}
                >
                  Configure
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-zinc-400 ${activeTab === 'chat' ? 'bg-zinc-100 text-black' : ''}`}
                  onClick={() => {
                    setActiveTab('chat');
                  }}
                >
                  View meetings
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsContent value="chat" className="flex-1 flex data-[state=active]:flex m-0">
              <div className="flex flex-1">
                {/* Chat list sidebar */}
                <div className="w-[300px] border-r border-zinc-800">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2 p-2 border border-zinc-700 rounded-xl">
                      <Plus size={16} className="text-zinc-400" />
                      <span className="text-zinc-400">New</span>
                    </div>
                    <button className="mt-4 w-full">
                      <div className="flex items-center gap-2 p-2 bg-zinc-800 rounded-xl">
                        <Image src="/zoomAgent.png" alt="Chat" width={20} height={20} />
                        <div>
                          <div className="text-zinc-400">Untitled meeting</div>
                          <div className="text-sm text-zinc-400">Today at {new Date().toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </button>
                    <button className="mt-4 w-full">
                      <div className="flex items-center gap-2 p-2 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all duration-500">
                        <Image src="/zoomAgent.png" alt="Chat" width={20} height={20} />
                        <div>
                          <div className="text-zinc-400">Untitled meeting</div>
                          <div className="text-sm text-zinc-400">Today at {new Date().toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </button>
                    <button className="w-full">
                      <div className="flex items-center gap-2 p-2 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all duration-500">
                        <Image src="/zoomAgent.png" alt="Chat" width={20} height={20} />
                        <div>
                          <div className="text-zinc-400">Untitled meeting</div>
                          <div className="text-sm text-zinc-400">Today at {new Date().toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Chat interface */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="h-[calc(100vh-155px)] p-4 overflow-y-auto">
                    {visibleTasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-4 mt-4 p-4 bg-zinc-800 rounded-xl">

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-white">{task.task}</span>
                          </div>
                          <div className="text-sm text-zinc-400">
                            From transcript:
                            <div className="mt-2 p-3 bg-zinc-900 rounded-lg">
                              <div className="relative">
                                <div className={`line-clamp-4 ${expanded === task.id ? 'line-clamp-none' : ''} pr-8`}>
                                  {task.metadata.transcript}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="absolute bottom-0 right-0 text-zinc-400 hover:text-white hover:bg-white/20"
                                  onClick={() => setExpanded(expanded === task.id ? null : task.id)}
                                >
                                  <Image 
                                    src="/expand.png"
                                    alt="Expand"
                                    width={16}
                                    height={16}
                                    className={`transform transition-transform ${expanded === task.id ? 'rotate-90' : ''}`}
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                          <Button 
                            variant="ghost" 
                            className={`shrink-0 bg-green-500/10 text-green-400 
                              hover:bg-green-500/20 hover:text-green-300
                              ${task.status === 'accepted' ? 'text-green-500' : ''}`}
                            onClick={() => {
                              setTasks(tasks.map(t => 
                                t.id === task.id 
                                  ? { ...t, status: 'accepted' }
                                  : t
                              ));
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            {task.status === 'accepted' ? 'Accepted' : 'Accept'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            className={`shrink-0 bg-red-500/10 text-red-400
                              hover:bg-red-500/20 hover:text-red-300
                              ${task.status === 'rejected' ? 'text-red-500' : ''}
                              ${task.status === 'accepted' ? 'opacity-20' : ''}`}
                            onClick={() => {
                              setTasks(tasks.map(t => 
                                t.id === task.id 
                                  ? { ...t, status: 'rejected' }
                                  : t
                              ));
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            {task.status === 'rejected' ? 'Rejected' : 'Reject'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-700 p-4">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex gap-2">
                        <Button variant="outline" className="bg-zinc-600 text-white border-none">
                          Join meeting
                        </Button>
                        <Button variant="outline" className="bg-zinc-600 text-white border-none">
                          Summarize meeting
                        </Button>
                        <Button variant="outline" className="bg-zinc-600 text-white border-none">
                          Approve all action items
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configure" className="flex-1 bg-zinc-900 data-[state=active]:flex">
              <ConfigView agent={selectedAgent} />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        // Empty state when no agent is selected
        <div className="flex-1 flex flex-col p-32">
          <div className="flex justify-between items-center mb-16">
            <div className="-space-y-2">
              <h1 className="text-[40px] text-blue-400 font-bold">Hi Carter,</h1>
              <h2 className="text-[40px] text-blue-400 font-bold">How can we help you today?</h2>
            </div>
            <NewAgentDialog 
              trigger={
                <Button className="gap-2 bg-white text-black">
                  <Plus className="h-5 w-5 text-black" />
                  New agent
                </Button>
              }
              onAgentCreate={handleAgentCreation}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl text-white font-bold">Seamlessly perform tasks between apps directly</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <div className="flex items-center gap-3">
                    <Image src="/zoomAgent.png" alt="Notion" width={24} height={24} />
                    <div>
                      <div className="text-zinc-500 font-medium">
                        <span className="text-white font-bold">Zoom</span> to read documents
                      </div>
                      <div className="text-zinc-500">and transcribe meetings</div>
                    </div>
                  </div>
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-600/80 text-white">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <div className="flex items-center gap-3">
                    <Image src="/notionLogo.png" alt="Notion" width={24} height={24} />
                    <div>
                      <div className="text-zinc-500 font-medium">
                        <span className="text-white font-bold">Notion</span> to read documents
                      </div>
                      <div className="text-zinc-500">and manage knowledge bases</div>
                    </div>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-blue-600 hover:bg-blue-600/80 text-white"
                    onClick={() => {}}
                  >
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <div className="flex items-center gap-3">
                    <Image src="/gmailAgent.png" alt="Gmail" width={24} height={24} />
                    <div>
                      <div className="text-zinc-500 font-medium">
                        <span className="text-white font-bold">Gmail</span> to read and draft emails
                      </div>
                      <div className="text-zinc-500">and manage your inbox</div>
                    </div>
                  </div>
                  <Button 
                    variant="default" 
                    className="bg-blue-600 hover:bg-blue-600/80 text-white"
                    onClick={() => {}}
                  >
                    Connect
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl text-white font-bold">Automate tasks by setting a schedule</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <div className="flex-1 text-white">Auto-reply to common support questions during off-hours</div>
                  <Button variant="ghost" className="text-zinc-400">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <div className="flex-1 text-white">Convert weekly standup meetings into task assignments</div>
                  <Button variant="ghost" className="text-zinc-400">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <div className="flex-1 text-white">Schedule team travel from calendar events</div>
                  <Button variant="ghost" className="text-zinc-400">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <div className="flex-1 text-white">Generate daily meeting summary presentations</div>
                  <Button variant="ghost" className="text-zinc-400">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
} 