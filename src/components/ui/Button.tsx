import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200",
  secondary: "bg-white text-gray-900 border border-gray-200 hover:border-orange-200",
  ghost: "text-gray-700 hover:text-orange-600",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

