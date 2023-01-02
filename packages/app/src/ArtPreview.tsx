import classNames from "classnames";
import {
  DetailedHTMLProps,
  IframeHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { gql } from "urql";

import { useArtPreviewQuery } from "../codegen/indexer";

gql`
  query ArtPreview($id: ID!) {
    token: aFundamentalDisputeToken(id: $id) {
      id
      html
    }
  }
`;

const ArtIframe = ({
  tokenId,
  hidden,
  ...props
}: { tokenId: string } & DetailedHTMLProps<
  IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
>) => {
  const [{ data }] = useArtPreviewQuery(
    hidden
      ? { pause: true }
      : {
          variables: { id: tokenId },
        }
  );
  // TODO: show message if token is not found?
  if (!data?.token) return null;
  return <iframe srcDoc={data.token.html} hidden={hidden} {...props} />;
};

type Props = {
  id: string;
};

export const ArtPreview = ({ id }: Props) => {
  const containerRef = useRef<HTMLIFrameElement>(null);
  const [shown, setShown] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shown) return;

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
  }, [shown]);

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
      <ArtIframe
        tokenId={id}
        hidden={!shown}
        className="w-full h-full pointer-events-none"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
