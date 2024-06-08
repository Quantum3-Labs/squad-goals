"use client";
import type { NextPage } from "next";
import { useState } from "react";
import { create } from 'kubo-rpc-client'; // Importa kubo-rpc-client
import ChallengeInput from "~~/app/launch/_components/ChallengeInput";
import ImageUploadDropzone from "~~/app/launch/_components/ImageUpload";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import { multiplyTo1e18 } from "~~/utils/scaffold-stark/priceinWei";

const PROJECT_ID = "2GajDLTC6y04qsYsoDRq9nGmWwK";
const PROJECT_SECRET = "48c62c6b3f82d2ecfa2cbe4c90f97037";
const PROJECT_ID_SECRECT = `${PROJECT_ID}:${PROJECT_SECRET}`;

  const ipfsClient = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      Authorization: `Basic ${Buffer.from(PROJECT_ID_SECRECT).toString("base64")}`,
    },
  });

const Launch: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedCID, setUploadedCID] = useState<string | null>(null); 
  const [ Ethstake , setEthStake ] = useState("")
  const [ duration , setDuration ] = useState(0)


  const handleImageUpload = (file: File) => {
    console.log("Uploaded file:", file);
    setImageFile(file);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEthStake = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setEthStake(e.target.value);
  };

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setDuration(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const { data: contractData } = useDeployedContractInfo("YourContract");

   const { writeAsync: stake } = useScaffoldMultiWriteContract({
     calls: [
       {
         contractName: "Eth",
         functionName: "approve",
         args: [contractData?.address??"", multiplyTo1e18(Ethstake)],
       },
       {
         contractName: "YourContract",
         functionName: "create_challenge",
        args: [multiplyTo1e18(Ethstake), duration,uploadedCID ?? ""],
      },
     ],
   });

  const handleSubmit = async () => {
    if (!name || !description || !imageFile) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    try {
      const addedImage = await ipfsClient.add(imageFile);

      const data = {
        name,
        description,
        image: `https://ipfs.infura.io/ipfs/${addedImage.path}`,
      };

      const addedData = await ipfsClient.add({ content: JSON.stringify(data) });

      console.log('Data uploaded to IPFS:', addedData);
      setUploadedCID(addedData.path); 
      alert(`Data uploaded to IPFS: https://ipfs.infura.io/ipfs/${addedData.path}`);
      await stake()
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      alert('Error uploading to IPFS');
    }
  };



   const wrapInTryCatch =
   (fn: () => Promise<any>, errorMessageFnDescription: string) => async () => {
     try {
       await fn();
     } catch (error) {
       console.error(
         `Error calling ${errorMessageFnDescription} function`,
         error,
       );
     }
   };


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
              <button onClick={handleSubmit} className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">
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
