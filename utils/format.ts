const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export const formatDate = (value: string) =>
  value ? `${dateFormat.format(new Date(`${value}Z`))} UTC` : "No start time set";

export const formatMoney = (amount: number, currency: string) =>
  `${currency} ${amount.toLocaleString("en-US")}`;

export const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
