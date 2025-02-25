'use client';

import ShimmerButton from "@/components/ui/shimmer-button";
import ShinyButton from "@/components/ui/shiny-button";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Icons } from "@/components/icons";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const workflowCards = [
  {
    category: "COMMUNICATION",
    title: "Meeting Notes to\nEmail Automation",
    workflows: [
      "Meeting Notes to Action Items",
      "Action Items to Email"
    ]
  },
  {
    category: "TASK MANAGEMENT",
    title: "Meeting Notes to\nLinear Integration",
    workflows: [
      "Meeting Notes to Action Items",
      "Action Items to Linear Tickets"
    ]
  },
  {
    category: "VOICE ASSISTANT",
    title: "AI Voice Call to\nTravel Booking",
    workflows: [
      "Phone Call with AI Agent",
      "Travel Booking Automation"
    ]
  },
  {
    category: "PRESENTATION",
    title: "Meeting Notes to\nSlide Deck",
    workflows: [
      "Notes to Presentation Outline",
      "Generate Slide Deck"
    ]
  }
];

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "kendrick") {
      setIsDialogOpen(false);
      window.location.href = "/dashboard";
    } else {
      setError("Incorrect password");
    }
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white relative">
      <FloatingNav navItems={navItems} />
      <div className="w-full max-w-7xl flex flex-col items-center gap-4">
        {/* Hero */}
        <div className="min-h-[100vh] space-y-12 items-center flex flex-col justify-center relative max-w-2xl">
          {/* Move AnimatedGridPattern inside hero section */}
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              "absolute inset-0"
            )}
          />
          
          {/* Add OrbitingCircles behind other elements */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative size-[400px] opacity-60">
              <div className="absolute inset-0">
                <OrbitingCircles iconSize={40}>
                  <Icons.zoom/>
                  <Icons.notion/>
                  <Icons.openai/>
                  <Icons.googleDrive/>
                  <Icons.linear />
                </OrbitingCircles>
              </div>
              <div className="absolute inset-0">
                <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                  <Icons.zoom/>
                  <Icons.notion/>
                  <Icons.openai/>
                  <Icons.googleDrive/>
                  <Icons.linear/>
                </OrbitingCircles>
              </div>
            </div>
          </div>

          {/* Modified hero content */}
          <div className="space-y-6 items-center flex flex-col relative z-10">
            <ShimmerButton
              className="w-fit"
              shimmerColor="#3498db"
              background="black"
            >
              Your team&apos;s personal OS
            </ShimmerButton>
            <h1 className="text-6xl font-bold text-center max-w-4xl leading-tight">
              Tedious workflows, {' '}
              <LineShadowText shadowColor="white" className="inline-block">
                reimagined
              </LineShadowText>
              .
            </h1>
          </div>

          <p className="text-zinc-400 text-center mb-8 text-lg font-medium relative z-10">
            Flow Pilot lets you hand off tasks to AI Agents, so you can concentrate on what really matters.
          </p>

          <ShinyButton
            text="Get started"
            className="items-center space-x-2.5 shadow-[0_13px_22px_rgba(0,0,0,0.10)] drop-shadow-[0_-9px_22px_rgba(255,255,255,0.87)] relative z-10"
            onClick={() => setIsDialogOpen(true)}
          />
        </div>

        {/* Workflow Cards */}
        <div className="w-full grid grid-cols-4 gap-12 px-8">
          {workflowCards.map((card, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-2xl p-8 overflow-hidden relative"
            >
              <div className="mb-2 inline-block">
                <span className="bg-[#222222] px-4 py-1 rounded-full text-sm text-zinc-300">
                  {card.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold mb-8 whitespace-pre-line">
                {card.title}
              </h2>

              <div className="space-y-2">
                <h3 className="text-zinc-400 uppercase text-sm font-medium mb-4">WORKFLOWS</h3>
                {card.workflows.map((workflow, workflowIndex) => (
                  <button 
                    key={workflowIndex}
                    className="w-full bg-[#111111] hover:bg-[#1a1a1a] rounded-lg p-4 text-left text-zinc-300 transition-colors"
                  >
                    {workflow}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-zinc-400 text-center text-3xl font-medium mt-24 mb-12">
          Transform meetings into actionable tasks in <span className="text-white">seconds</span>, not hours.
        </p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#111111] border-zinc-800 w-full max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Enter Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white border border-zinc-800 rounded-lg p-2"
              placeholder="Enter password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-black rounded-lg p-2 hover:bg-zinc-200 transition-colors"
            >
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-4 flex justify-end gap-4 text-sm text-zinc-500">
        <a href="#" className="hover:text-zinc-300">Help Center</a>
      </footer>
    </main>
  );
}
