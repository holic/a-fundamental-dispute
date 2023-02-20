import fetch from "node-fetch";

export const generateImages = async (
  rendererAddress: string,
  tokenId: number,
  seed: number,
  html: string
) => {
  console.log("generating images", rendererAddress, tokenId, seed);
  const res = await fetch("https://afd-renderer.up.railway.app/api/render", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rendererAddress,
      tokenId,
      seed,
      html,
    }),
  }).then((res) => res.json());
  if (res.error) {
    throw new Error(res.error);
  }
  console.log("image status", res.status, rendererAddress, tokenId, seed);
};
