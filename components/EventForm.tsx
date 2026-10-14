"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { eventFormSchema, getFieldErrors } from "@/utils/schemas";
import type { EventDetails } from "@/utils/types";
import Button from "./Button";
import Field, { inputCls } from "./Field";

type EventFormProps = {
  initial: EventDetails;
  submitLabel: string;
  onSubmit: (details: EventDetails) => void;
  onCancel: () => void;
};

const EventForm = ({ initial, submitLabel, onSubmit, onCancel }: EventFormProps) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update =
    (key: keyof EventDetails) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = eventFormSchema.safeParse(form);
    if (!result.success) return setErrors(getFieldErrors(result.error));
    onSubmit(result.data);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <Field label="Title" error={errors.title}>
        <input className={inputCls} value={form.title} onChange={update("title")} />
      </Field>
      <Field label="Start time (UTC), needed before scheduling" error={errors.startsAt}>
        <input
          type="datetime-local"
          className={inputCls}
          value={form.startsAt}
          onChange={update("startsAt")}
        />
      </Field>
      <Field label="Description" error={errors.description}>
        <textarea
          rows={3}
          className={inputCls}
          value={form.description}
          onChange={update("description")}
        />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
