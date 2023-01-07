import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { linkClassNames } from "./TextLink";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { pending?: boolean };

export const ButtonLink = ({
  type,
  className,
  pending,
  disabled,
  ...props
}: Props) => (
  <button
    type={type || "button"}
    disabled={pending || disabled}
    aria-busy={pending}
    className={classNames(linkClassNames, className)}
    {...props}
  />
);
