import classNames from "classnames";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export const linkClassNames =
  "group text-left underline decoration-indigo-800 decoration-2 underline-offset-2 text-stone-300 transition hover:text-white hover:decoration-yellow-500";

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const TextLink = ({
  className,
  target,
  rel = target === "_blank" ? "noopener noreferrer" : undefined,
  ...props
}: LinkProps) => (
  <a
    className={classNames(linkClassNames, className)}
    target={target}
    rel={rel}
    {...props}
  />
);
