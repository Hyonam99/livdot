import { Suspense } from "react";
import BackLink from "@/components/BackLink";
import EventDashboard from "@/components/EventDashboard";

const EventPage = ({ params }: PageProps<"/events/[id]">) => (
  <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 lg:px-8">
    <BackLink />
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading event…</p>}>
      {params.then(({ id }) => (
        <EventDashboard id={id} />
      ))}
    </Suspense>
  </main>
);

export default EventPage;
