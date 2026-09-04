import Link from "next/link";

export default function Logo({ size = "default", showText = true, className = "" }) {
  const iconSizes = {
    small: "w-7 h-7",
    default: "w-8 h-8",
    large: "w-10 h-10",
  };

  const textSizes = {
    small: "text-lg",
    default: "text-xl",
    large: "text-2xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-transform hover:scale-[1.02] ${className}`}>
      {/* Dynamic Pulse & Spark Vector Logo */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-all duration-300`}>
        <div className={`flex items-center justify-center bg-slate-900 rounded-[10px] ${iconSizes[size] || iconSizes.default}`}>
          <svg
            className="w-5 h-5 text-cyan-300 transition-transform group-hover:rotate-12 duration-300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Heartbeat pulse wave + spark */}
            <path
              d="M3 12H7L10 4L14 20L17 12H21"
              stroke="url(#pulse-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="4" r="1.5" fill="#38BDF8" className="animate-ping opacity-75" />
            <circle cx="10" cy="4" r="1.5" fill="#38BDF8" />
            <defs>
              <linearGradient id="pulse-gradient" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" />
                <stop offset="0.5" stopColor="#38BDF8" />
                <stop offset="1" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <span className={`font-black tracking-tight text-slate-900 ${textSizes[size] || textSizes.default}`}>
          Skill<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Pulse</span>
        </span>
      )}
    </Link>
  );
}
