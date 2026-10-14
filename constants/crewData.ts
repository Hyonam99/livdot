import type { CrewAssignment, CrewMember } from "@/utils/types";

export const crewMembers: CrewMember[] = [
  { id: "crw_1", name: "Tolu Adeyemi", role: "Director" },
  { id: "crw_2", name: "Chidi Okafor", role: "Camera operator" },
  { id: "crw_3", name: "Amaka Eze", role: "Sound engineer" },
  { id: "crw_4", name: "Femi Bello", role: "Stream technician" },
];

export const crewAssignments: CrewAssignment[] = [
  { eventId: "evt_002", memberId: "crw_1", status: "pending" },
  { eventId: "evt_003", memberId: "crw_1", status: "accepted" },
  { eventId: "evt_003", memberId: "crw_4", status: "accepted" },
  { eventId: "evt_004", memberId: "crw_2", status: "accepted" },
  { eventId: "evt_004", memberId: "crw_4", status: "accepted" },
  { eventId: "evt_005", memberId: "crw_3", status: "accepted" },
  { eventId: "evt_006", memberId: "crw_1", status: "accepted" },
];
