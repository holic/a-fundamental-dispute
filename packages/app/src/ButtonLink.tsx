import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { linkClassNames } from "./TextLink";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ButtonLink = ({ type, className, ...props }: ButtonProps) => (
  <button
    type={type || "button"}
    className={classNames(linkClassNames, className)}
    {...props}
  />
);
