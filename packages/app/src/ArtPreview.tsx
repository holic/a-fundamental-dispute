import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
};

export const ArtPreview = ({ url }: Props) => {
  const containerRef = useRef<HTMLIFrameElement>(null);
  const [shown, setShown] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setShown(entry.isIntersecting);
      });
    });

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-stone-900">
      <div
        className={classNames(
          "absolute inset-0 bg-stone-900 flex items-center justify-center text-stone-600 font-mono text-sm pointer-events-none transition duration-1000",
          loaded ? "opacity-0" : "opacity-100"
        )}
      >
        Rendering…
      </div>
      <iframe
        src={shown || loaded ? url : "about:blank"}
        hidden={!shown}
        className="w-full h-full"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
