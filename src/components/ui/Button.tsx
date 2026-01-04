import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          {
            "bg-orange-600 text-white hover:bg-orange-700": variant === "primary",
            "bg-gray-900 text-white hover:bg-gray-800": variant === "default",
            "border border-gray-300 bg-white hover:bg-gray-50": variant === "outline",
            "text-gray-600 hover:text-gray-900": variant === "secondary",
            "text-gray-500 hover:text-gray-900": variant === "ghost",
          },
          
          // Sizes
          {
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-9 rounded-md px-3 text-xs": size === "sm",
            "h-11 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

