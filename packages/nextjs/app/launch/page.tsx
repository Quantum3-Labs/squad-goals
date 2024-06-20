"use client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ChallengeInput from "~~/app/launch/_components/ChallengeInput";
import ImageUploadDropzone from "~~/app/launch/_components/ImageUpload";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import { multiplyTo1e18 } from "~~/utils/scaffold-stark/priceinWei";
import { addToIPFS, readFileAsBase64 } from "~~/utils/ipfs-fetch";
import { useRouter } from "next/navigation";

const Launch: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedCID, setUploadedCID] = useState<string | null>(null);
  const [Ethstake, setEthStake] = useState("");
  const [duration, setDuration] = useState(0);
  const { data: contractData } = useDeployedContractInfo("YourContract");
  const navigate = useRouter();

  const { writeAsync: createChallenge } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Eth",
        functionName: "approve",
        args: [contractData?.address ?? "", multiplyTo1e18(Ethstake)],
      },
      {
        contractName: "YourContract",
        functionName: "create_challenge",
        args: [multiplyTo1e18(Ethstake), duration, uploadedCID ?? ""],
      },
    ],
  });

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEthStake = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEthStake(e.target.value);
  };

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name || !description || !imageFile) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    try {
      const data = {
        name,
        description,
        image: await readFileAsBase64(imageFile),
      };

      const addedData = await addToIPFS(data);

      console.log("Data uploaded to IPFS:", addedData);

      setUploadedCID(addedData.path);
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert("Error uploading to IPFS");
    }
  };

  useEffect(() => {
    if (uploadedCID) {
      createChallenge().then(() => {
        console.log("Challenge created");
        navigate.push(`/challenges`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedCID]);

  return (
    <>
      <div className="flex items-center w-full flex-col">
        <div className="bg-app flex w-full justify-center">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className="pb-10">
              <span className="text-4xl">Launch Your Own Challenge</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 py-20">
              <div className="flex justify-between w-full text-xl gap-4">
                <div className="flex flex-col gap-5 flex-1">
                  <ChallengeInput
                    name="name"
                    placeholder="every challenge must have a name"
                    onChange={handleNameChange}
                  />
                  <div className="flex flex-col gap-2">
                    <span>description</span>
                    <textarea
                      className="max-w-[560px] rounded-md border-2 border-black px-4 py-3 h-[240px]"
                      placeholder="make sure it is SMART; specific, measurable, achievable, relevant, time bound."
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5 flex-1">
                  <ChallengeInput
                    name="duration"
                    placeholder="how long the challenge is open in days"
                    value={String(duration)}
                    onChange={handleDuration}
                  />
                  <ChallengeInput
                    name="ETH Stake"
                    placeholder="Required deposit to participate, e.g. 0.05 ETH"
                    value={Ethstake}
                    onChange={handleEthStake}
                  />
                </div>
              </div>
              <span className="text-xl">NFT Image</span>
              <ImageUploadDropzone onImageUpload={handleImageUpload} />
              <button
                onClick={handleSubmit}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Launch;
