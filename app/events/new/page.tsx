import BackLink from "@/components/BackLink";
import CreateEvent from "@/components/CreateEvent";

const NewEventPage = () => (
  <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
    <BackLink />
    <h1 className="text-2xl font-semibold">Create event</h1>
    <p className="mb-6 text-sm text-zinc-500">
      New events start as drafts. Add a start time when you are ready to schedule.
    </p>
    <CreateEvent />
  </main>
);

export default NewEventPage;
