import Link from "next/link";
import { Bell } from "lucide-react";
import { hostName } from "@/constants/navData";

const TopBar = () => (
  <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:px-8">
    <Link href="/" className="text-xl font-black tracking-tight">
      LIV<span className="text-red-600">•</span>DOT
    </Link>
    <div className="flex items-center gap-3">
      <button
        aria-label="Notifications"
        className="flex size-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
      >
        <Bell className="size-4" />
      </button>
      <span className="hidden text-sm font-medium sm:inline">{hostName}</span>
    </div>
  </header>
);

export default TopBar;
