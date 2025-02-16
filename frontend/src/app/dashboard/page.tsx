'use client';

import { useEffect, useState } from 'react';
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

          <DialogClose asChild>
            <Button 
              className="w-full bg-black text-white" 
              variant="secondary"
              onClick={() => handleCreateAgent(agentName, "/agentIcon.png")}
            >
              Start from scratch
            </Button>
          </DialogClose>
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

// Modify the Task type to include rowNumber
type Task = {
  id: string;
  rowNumber: number;
  task: string;
  tool: string;
  metadata: TaskMetadata;
  status: 'pending' | 'accepted' | 'rejected';
};

// Add this helper function before the Dashboard component
const groupTasksByTranscript = (tasks: Task[]) => {
  const groups = new Map<string, {meetingId: string, tasks: Task[]}>();
  let meetingCounter = 1;
  
  tasks.forEach(task => {
    const transcript = task.metadata.transcript;
    if (!groups.has(transcript)) {
      groups.set(transcript, {
        meetingId: `Meeting ${meetingCounter}`,
        tasks: []
      });
      meetingCounter++;
    }
    groups.get(transcript)?.tasks.push(task);
  });
  
  return Array.from(groups.values());
};

// Add this mapping constant before the Dashboard component
const TOOL_MAPPING = {
  'support': 'send email',
  'task': 'notion',
  'travel': 'make a call',
  'presentation': 'create presentation'
};

export default function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(1);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log('Fetching tasks...');
        const response = await fetch('https://api.sheety.co/9f08a4ccc751b7ebebc8bc4a0a91b5f4/zoomTranscripts/sheet3');
        const json = await response.json();
        
        console.log('Raw API response:', json);
        console.log('Sheet3 data:', json.sheet3);
        
        const mappedTasks = json.sheet3.map((row: any, index: number) => ({
          id: crypto.randomUUID(),
          rowNumber: index + 2,
          task: row.task,
          tool: row.tool,
          metadata: {
            transcript: row.transcript
          },
          status: row.approve ? 'accepted' : 'pending'
        }));
        
        // Reverse the array to show latest rows first
        const reversedTasks = mappedTasks.reverse();
        
        console.log('All mapped tasks (reversed):', reversedTasks);
        setTasks(reversedTasks);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch tasks:', error);
          console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
          });
        } else {
          console.error('An unknown error occurred:', error);
        }
      }
    };

    fetchTasks();
  }, []);

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

  const updateTaskApproval = async (taskId: string, approve: boolean) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const url = `https://api.sheety.co/9f08a4ccc751b7ebebc8bc4a0a91b5f4/zoomTranscripts/sheet3/${task.rowNumber}`;
      const body = {
        sheet3: {
          approve: approve
        }
      };

      console.log('Updating task:', {
        taskId,
        rowNumber: task.rowNumber,
        url,
        body
      });

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const responseData = await response.json().catch(e => console.log('Failed to parse response:', e));
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setTasks(tasks.map(t => 
        t.id === taskId 
          ? { ...t, status: approve ? 'accepted' : 'rejected' }
          : t
      ));
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to update task:', error);
      }
    }
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
                      <span className="text-zinc-400">New meeting</span>
                    </div>

                    {/* Meeting 1 */}
                    <button 
                      className={`w-full text-left ${selectedMeeting === 1 ? 'opacity-100' : 'opacity-70'}`}
                      onClick={() => setSelectedMeeting(selectedMeeting === 1 ? null : 1)}
                    >
                      <div className={`flex items-center gap-2 p-2 ${selectedMeeting === 1 ? 'bg-zinc-700' : 'bg-zinc-800'} rounded-xl`}>
                        <div className="flex gap-1">
                          <Image src="/zoomAgent.png" alt="Gmail" width={20} height={20} />
                          <Image src="/gmailAgent.png" alt="Zoom" width={20} height={20} />
                        </div>
                        <div>
                          <div className="text-zinc-400">Meeting 1</div>
                          <div className="text-sm text-zinc-400">{new Date().toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </button>

                    {/* Meeting 2 */}
                    <button 
                      className={`w-full text-left ${selectedMeeting === 2 ? 'opacity-100' : 'opacity-70'}`}
                      onClick={() => setSelectedMeeting(selectedMeeting === 2 ? null : 2)}
                    >
                      <div className={`flex items-center gap-2 p-2 ${selectedMeeting === 2 ? 'bg-zinc-700' : 'bg-zinc-900'} rounded-xl hover:bg-zinc-800 transition-all duration-500`}>
                        <div className="flex gap-1">
                          <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                          <Image src="/slidesAgent.png" alt="Linear" width={20} height={20} />
                        </div>
                        <div>
                          <div className="text-zinc-400">Meeting 2</div>
                          <span className="text-sm text-zinc-500">{new Date().toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </button>

                    {/* Meeting 3 */}
                    <button 
                      className={`w-full text-left ${selectedMeeting === 3 ? 'opacity-100' : 'opacity-70'}`}
                      onClick={() => setSelectedMeeting(selectedMeeting === 3 ? null : 3)}
                    >
                      <div className={`flex items-center gap-2 p-2 ${selectedMeeting === 3 ? 'bg-zinc-700' : 'bg-zinc-900'} rounded-xl hover:bg-zinc-800 transition-all duration-500`}>
                        <div className="flex gap-1">
                          <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                          <Image src="/phoneAgent.png" alt="Phone" width={20} height={20} />
                        </div>
                        <div>
                          <div className="text-zinc-400">Meeting 3</div>
                          <span className="text-sm text-zinc-500">{new Date().toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </button>

                    {/* Meeting 4 */}
                    <button 
                      className={`w-full text-left ${selectedMeeting === 4 ? 'opacity-100' : 'opacity-70'}`}
                      onClick={() => setSelectedMeeting(selectedMeeting === 4 ? null : 4)}
                    >
                      <div className={`flex items-center gap-2 p-2 ${selectedMeeting === 4 ? 'bg-zinc-700' : 'bg-zinc-900'} rounded-xl hover:bg-zinc-800 transition-all duration-500`}>
                        <div className="flex gap-1">
                          <Image src="/zoomAgent.png" alt="Zoom" width={20} height={20} />
                          <Image src="/linear.png" alt="Slides" width={20} height={20} />
                        </div>
                        <div>
                          <div className="text-zinc-400">Meeting 4</div>
                          <span className="text-sm text-zinc-500">{new Date().toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Chat interface */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="h-[calc(100vh-155px)] p-4 overflow-y-auto">
                    {groupTasksByTranscript(tasks)
                      .filter(({meetingId}) => !selectedMeeting || meetingId === `Meeting ${selectedMeeting}`)
                      .map(({meetingId, tasks: meetingTasks}) => (
                        <div key={meetingId} className="mb-8">
                          <h3 className="text-lg font-medium text-zinc-300 mb-4">{meetingId}</h3>
                          {meetingTasks.map((task) => (
                            <div key={task.id} className="flex items-start gap-4 mt-4 p-4 bg-zinc-800 rounded-xl">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">{task.task}</span>
                                  <span className="text-sm text-zinc-500">Today at {new Date().toLocaleTimeString()}</span>
                                </div>
                                <div className="text-sm text-zinc-400">
                                  From transcript:
                                  <div className="mt-2 p-3 bg-zinc-900 rounded-lg min-h-16">
                                    <div className="relative">
                                      <div className={`line-clamp-4 ${expanded === task.id ? 'line-clamp-none' : ''} pr-8 whitespace-pre-line`}>
                                        {task.metadata.transcript
                                          .replace(/^\{"transcript":\s*"|"\}$/g, '')
                                          .replace(/\\n/g, '\n')
                                          .replace(/\\"/g, "'")}
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
                                  onClick={() => updateTaskApproval(task.id, true)}
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
                                  onClick={() => updateTaskApproval(task.id, false)}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  {task.status === 'rejected' ? 'Rejected' : 'Reject'}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>

                  <div className="border-t border-zinc-700 p-4">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="bg-zinc-600 text-white border-none"
                        onClick={() => {
                          // Update all tasks to accepted status
                          setTasks(tasks.map(task => ({ ...task, status: 'accepted' })));
                          
                          // Encode the message for URL
                          const message = "Get the last action items from the meeting recording and execute every single one of them."
                          
                          // Redirect to chat URL with tasks
                          window.location.href = `https://treehacks-assistant.dain.org/chat?message=${message}`;
                        }}
                      >
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