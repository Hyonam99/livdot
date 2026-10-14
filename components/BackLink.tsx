import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const BackLink = () => (
  <Link href="/" className="mb-3 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900">
    <ChevronLeft className="size-4" />
    All events
  </Link>
);

export default BackLink;
