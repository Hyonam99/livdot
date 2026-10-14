import { LoaderCircle } from "lucide-react";
import { inviteLooks } from "@/constants/statusData";
import type { InviteStatus } from "@/utils/types";

const InviteBadge = ({ status }: { status: InviteStatus }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${inviteLooks[status].cls}`}
  >
    {status === "pending" && <LoaderCircle className="size-3 animate-spin" />}
    {inviteLooks[status].text}
  </span>
);

export default InviteBadge;
