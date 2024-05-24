import cn from "@/lib";
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  disabled,
  className,
  children,
  type = "button",
  ...rest
}) => {
  return (
    <button
      className={cn(
        `px-4 py-3 rounded-md bg-primary text-white border border-primary`,
        className
      )}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;