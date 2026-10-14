import { formatMoney } from "@/utils/format";
import type { TicketInfo } from "@/utils/types";
import StatTile from "./StatTile";

const SalesStats = ({ ticket }: { ticket: TicketInfo }) => {
  const share = Math.min(100, Math.round((ticket.sold / ticket.capacity) * 100));

  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
      <StatTile
        label="Tickets sold"
        value={`${ticket.sold} / ${ticket.capacity}`}
        note={
          <div className="mt-2 h-1.5 rounded-full bg-zinc-100">
            <div className="h-1.5 rounded-full bg-emerald-600" style={{ width: `${share}%` }} />
          </div>
        }
      />
      <StatTile label="Ticket price" value={formatMoney(ticket.price, ticket.currency)} />
      <StatTile
        label="Revenue"
        value={formatMoney(ticket.price * ticket.sold, ticket.currency)}
        note={
          ticket.sold >= ticket.capacity && (
            <p className="text-xs font-medium text-orange-600">Sold out</p>
          )
        }
      />
    </div>
  );
};

export default SalesStats;
