import Image from "next/image";
import ShimmerButton from "@/components/ui/shimmer-button";
import ShinyButton from "@/components/ui/shiny-button";
import OrbitingCircles from "@/components/ui/shiny-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
      <div className="w-full max-w-3xl flex flex-col items-center gap-4">
        {/* Hero */}
        <div className="min-h-[80vh] space-y-8 items-center flex flex-col justify-center">
          <div className="space-y-3 items-center flex flex-col">
            <ShimmerButton
              className="w-fit"
              shimmerColor="#3498db"
              background="black"
            >
              Your team&apos; personal OS
            </ShimmerButton>
            <h1 className="text-6xl font-bold text-center max-w-4xl leading-tight">
              Simplify your workflows using AI
            </h1>
          </div>

          <p className="text-gray-400 text-center mb-8 text-lg font-medium">
            Flow Pilot lets you hand off tasks to AI Agents, so you can concentrate on what really matters.
          </p>

          <ShinyButton
            text="Get started"
            className="items-center space-x-2.5 shadow-[0_13px_22px_rgba(0,0,0,0.10)] drop-shadow-[0_-9px_22px_rgba(255,255,255,0.87)]"
            href="/dashboard"
          />
        </div>

        {/* Subheading */}
        <p className="text-gray-400 text-center mb-8">
          Transform meeting notes into actionable tasks in <span className="text-white">seconds</span>, not hours.
        </p>

        {/* Workflow Cards */}
        <div className="w-full flex flex-row gap-8">
          {/* Communication Card */}
          <div className="w-1/2 bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-2xl p-8 overflow-hidden relative">
            <div className="mb-2 inline-block">
              <span className="bg-[#222222] px-4 py-1 rounded-full text-sm text-gray-300">
                COMMUNICATION
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-8">
              Meeting Notes to<br />
              Email Automation
            </h2>

            <div className="space-y-2">
              <h3 className="text-gray-400 uppercase text-sm font-medium mb-4">WORKFLOWS</h3>
              <button className="w-full bg-[#111111] hover:bg-[#1a1a1a] rounded-lg p-4 text-left text-gray-300 transition-colors">
                Meeting Notes to Action Items
              </button>
              <button className="w-full bg-[#111111] hover:bg-[#1a1a1a] rounded-lg p-4 text-left text-gray-300 transition-colors">
                Action Items to Email
              </button>
            </div>
          </div>

          {/* Task Management Card */}
          <div className="w-1/2 bg-gradient-to-br from-[#111111] to-[#1a1a1a] rounded-2xl p-8 overflow-hidden relative">
            <div className="mb-2 inline-block">
              <span className="bg-[#222222] px-4 py-1 rounded-full text-sm text-gray-300">
                TASK MANAGEMENT
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-8">
              Meeting Notes to<br />
              Linear Integration
            </h2>

            <div className="space-y-2">
              <h3 className="text-gray-400 uppercase text-sm font-medium mb-4">WORKFLOWS</h3>
              <button className="w-full bg-[#111111] hover:bg-[#1a1a1a] rounded-lg p-4 text-left text-gray-300 transition-colors">
                Meeting Notes to Action Items
              </button>
              <button className="w-full bg-[#111111] hover:bg-[#1a1a1a] rounded-lg p-4 text-left text-gray-300 transition-colors">
                Action Items to Linear Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-4 flex justify-end gap-4 text-sm text-gray-500">
        <a href="#" className="hover:text-gray-300">Help Center</a>
      </footer>
    </main>
  );
}
