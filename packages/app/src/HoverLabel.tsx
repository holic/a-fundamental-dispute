import { ReactNode } from "react";

type Props = {
  label: ReactNode;
  labelHover: ReactNode;
};

export const HoverLabel = ({ label, labelHover }: Props) => (
  <span className="inline-grid pointer-events-none overflow-hidden">
    <span className="row-start-1 col-start-1 transition opacity-0 sm:opacity-100 sm:translate-y-0 sm:group-hover:-translate-y-3 sm:group-hover:opacity-0">
      {label}
    </span>
    <span className="row-start-1 col-start-1 transition opacity-100 sm:opacity-0 sm:translate-y-3 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
      {labelHover}
    </span>
  </span>
);
