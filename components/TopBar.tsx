import Link from "next/link";
import { hostName } from "@/constants/navData";
import NotifyBell from "./NotifyBell";

const TopBar = () => (
  <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:px-8">
    <Link href="/" className="text-xl font-black tracking-tight">
      LIV<span className="text-red-600">•</span>DOT
    </Link>
    <div className="flex items-center gap-3">
      <NotifyBell />
      <span className="hidden text-sm font-medium sm:inline">{hostName}</span>
    </div>
  </header>
);

export default TopBar;
