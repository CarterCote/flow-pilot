import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
      <div className="w-full max-w-3xl flex flex-col items-center gap-4">
        {/* Bolt Logo */}
        <Image
          src="/bolt-logo.svg"
          alt="Bolt logo"
          width={80}
          height={32}
          className="mb-16"
        />

        {/* Main Heading */}
        <h1 className="text-5xl font-bold text-center mb-4">
          What do you want to build?
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-center mb-8">
          Prompt, run, edit, and deploy full-stack <span className="text-white">web</span> and <span className="text-white">mobile</span> apps.
        </p>

        {/* Text Input Area */}
        <div className="w-full bg-[#111111] rounded-lg p-4 min-h-[120px]">
          <textarea 
            placeholder="How can Bolt help you today?"
            className="w-full bg-transparent border-none outline-none resize-none text-gray-300"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button className="p-2 hover:bg-[#222222] rounded-md transition-colors">
              <Image
                src="/link-icon.svg"
                alt="Link"
                width={20}
                height={20}
              />
            </button>
            <button className="p-2 hover:bg-[#222222] rounded-md transition-colors">
              <Image
                src="/magic-icon.svg"
                alt="Magic wand"
                width={20}
                height={20}
              />
            </button>
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
