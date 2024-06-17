import { AddResult } from "kubo-rpc-client";

const fetchFromApi = ({
  path,
  method,
  body,
}: {
  path: string;
  method: string;
  body?: object;
}) =>
  fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

export const addToIPFS = (yourJSON: object): Promise<AddResult> =>
  fetchFromApi({ path: "/api/ipfs/add", method: "POST", body: yourJSON });

export const getMetadataFromIPFS = (ipfsHash: string) =>
  fetchFromApi({
    path: "/api/ipfs/get-metadata",
    method: "Post",
    body: { ipfsHash },
  });

export async function readFileAsBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
