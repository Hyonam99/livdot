import type { ReactNode } from "react";

type CardProps = {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
};

const Card = ({ title, aside, children }: CardProps) => (
  <section className="rounded-lg border border-zinc-200 bg-white p-4">
    <div className="mb-3 flex items-center justify-between gap-2">
      <h2 className="font-semibold">{title}</h2>
      {aside}
    </div>
    {children}
  </section>
);

export default Card;
