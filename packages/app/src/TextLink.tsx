import classNames from "classnames";
import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export const linkClassNames =
  "group text-left underline decoration-indigo-800 decoration-2 underline-offset-2 text-stone-300 transition hover:text-white hover:decoration-yellow-500 disabled:hover:decoration-red-700 disabled:cursor-not-allowed aria-[busy]:hover:text-stone-300 aria-[busy]:hover:decoration-indigo-800 aria-[busy]:cursor-default";

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { href: string };

export const TextLink = ({
  href,
  className,
  target,
  rel = target === "_blank" ? "noopener noreferrer" : undefined,
  ...props
}: LinkProps) => (
  <Link href={href} passHref>
    <a
      className={classNames(linkClassNames, className)}
      target={target}
      rel={rel}
      {...props}
    />
  </Link>
);
