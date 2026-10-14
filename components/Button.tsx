import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-700",
  secondary: "border border-zinc-300 bg-white hover:bg-zinc-100",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

export const buttonCls = (variant: Variant = "primary") =>
  `inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]}`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

const Button = ({ variant, className = "", ...props }: ButtonProps) => (
  <button className={`${buttonCls(variant)} ${className}`} {...props} />
);

export default Button;
