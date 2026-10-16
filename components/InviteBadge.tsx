import { LoaderCircle } from "lucide-react";
import { inviteLooks } from "@/constants/statusData";
import type { InviteStatus } from "@/utils/types";
import Pill from "./Pill";

const InviteBadge = ({ status }: { status: InviteStatus }) => (
  <Pill cls={inviteLooks[status].cls}>
    {status === "pending" && <LoaderCircle className="size-3 animate-spin" />}
    {inviteLooks[status].text}
  </Pill>
);

export default InviteBadge;
