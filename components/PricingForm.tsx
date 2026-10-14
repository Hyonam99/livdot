"use client";

import { useState, type FormEvent } from "react";
import { useAppDispatch } from "@/store";
import { savePricing } from "@/store/ticketSlice";
import { getFieldErrors, pricingSchema } from "@/utils/schemas";
import type { TicketInfo } from "@/utils/types";
import Button from "./Button";
import Field, { inputCls } from "./Field";

type PricingFormProps = {
  eventId: string;
  ticket?: TicketInfo;
};

const PricingForm = ({ eventId, ticket }: PricingFormProps) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    price: ticket ? String(ticket.price) : "",
    capacity: ticket ? String(ticket.capacity) : "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof form) => (value: string) => {
    setForm({ ...form, [key]: value });
    setSaved(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = pricingSchema(ticket?.sold ?? 0).safeParse(form);
    if (!result.success) return setErrors(getFieldErrors(result.error));
    setErrors({});
    dispatch(savePricing({ eventId, ...result.data }));
    setSaved(true);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Ticket price (NGN)" error={errors.price}>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            className={inputCls}
            value={form.price}
            onChange={(e) => update("price")(e.target.value)}
          />
        </Field>
        <Field label="Capacity (tickets)" error={errors.capacity}>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            className={inputCls}
            value={form.capacity}
            onChange={(e) => update("capacity")(e.target.value)}
          />
        </Field>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">{ticket ? "Update pricing" : "Set pricing"}</Button>
        {saved && <span className="text-sm text-emerald-700">Pricing saved</span>}
      </div>
    </form>
  );
};

export default PricingForm;
