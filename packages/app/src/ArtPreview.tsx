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
import { previewImageUrl } from "./previewImageUrl";

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
      executeQuery({ requestPolicy: "cache-and-network" });
    }, 1000);
    return () => clearInterval(timer);
  }, [data, error, executeQuery, fetching, hidden]);

  // TODO: show message if token is not found?
  if (!data?.token) return null;
  return <iframe srcDoc={data.token.html} hidden={hidden} {...props} />;
};

type Props = {
  tokenId: number;
  seed: number;
  disablePointerEvents?: boolean;
  useImage?: boolean;
};

export const ArtPreview = ({
  tokenId,
  seed,
  disablePointerEvents,
  useImage,
}: Props) => {
  const containerRef = useRef<HTMLIFrameElement>(null);
  const [shown, setShown] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const imageUrl = previewImageUrl(tokenId, seed);
  const [hasImage, setHasImage] = useState<boolean | null>(null);

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

  useEffect(() => {
    if (!useImage) return;
    if (!shown) return;
    let mounted = true;
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => mounted && setHasImage(true);
    image.onerror = () => mounted && setHasImage(false);
    return () => {
      mounted = false;
    };
  }, [imageUrl, shown, useImage]);

  if (useImage) {
    return (
      <div ref={containerRef} className="w-full h-full bg-stone-900">
        {hasImage == null || hasImage === true ? (
          <img
            src={hasImage ? imageUrl : undefined}
            className={classNames(
              `w-full h-full transition duration-[3s]`,
              hasImage ? "opacity-100" : "opacity-0",
              disablePointerEvents ? "pointer-events-none" : null
            )}
          />
        ) : (
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
        )}
      </div>
    );
  }

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
