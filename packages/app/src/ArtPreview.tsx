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
}: { tokenId: number } & DetailedHTMLProps<
  IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
>) => {
  const [{ data, error, fetching }, executeQuery] = useArtPreviewQuery(
    hidden
      ? { pause: true }
      : {
          variables: { id: tokenId.toString() },
        }
  );

  useEffect(() => {
    if (data?.token || error || fetching || hidden) return;
    const timer = setInterval(() => {
      console.log("checking for token");
      executeQuery();
    }, 1000);
    return () => clearInterval(timer);
  }, [data, error, executeQuery, fetching, hidden]);

  // TODO: show message if token is not found?
  if (!data?.token) return null;
  return <iframe srcDoc={data.token.html} hidden={hidden} {...props} />;
};

type Props = {
  tokenId: number;
  disablePointerEvents?: boolean;
};

export const ArtPreview = ({ tokenId, disablePointerEvents }: Props) => {
  const containerRef = useRef<HTMLIFrameElement>(null);
  const [shown, setShown] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shown) return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShown(entry.isIntersecting);
        });
      },
      { rootMargin: "-20%" }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [shown]);

  return (
    <div ref={containerRef} className="w-full h-full bg-stone-900">
      <ArtIframe
        tokenId={tokenId}
        hidden={!shown}
        onLoad={() => setLoaded(true)}
        className={classNames(
          `w-full h-full transition duration-[3s]`,
          loaded ? "opacity-100" : "opacity-0",
          disablePointerEvents ? "pointer-events-none" : null
        )}
      />
    </div>
  );
};
