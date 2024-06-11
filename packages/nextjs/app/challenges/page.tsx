"use client";
import type { NextPage } from "next";
import ChallengeInput from "~~/app/launch/_components/ChallengeInput";
import ImageUpload from "~~/app/launch/_components/ImageUpload";
import Image from "next/image";
import SquadTable from "~~/app/challenges/_components/SquardTable";
import { challenges } from "~~/data/data";
import ChallengeCard from "~~/app/home/_components/ChallengeCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useEffect, useState} from "react";
import { useScaffoldContract } from "~~/hooks/scaffold-stark/useScaffoldContract";
import { useAccount } from "@starknet-react/core";
import { getNFTMetadataFromIPFS } from "../launch/api/ipfs";
import { useCID } from "~~/components/CIDContext";

const Challenges: NextPage = () => {

  const { uploadedCIDs } = useCID();
  const participants = [
    {
      address: "0x7b86F576669f8d20a8244dABEFc65b31d7dEB3f2",
      completed: 3,
      total: 3,
    },
    {
      address: "0x6a56F576669f8d20a8244dABEFc65b31d7dEB4f1",
      completed: 2,
      total: 3,
    },
    {
      address: "0x6a56F576669f8d20a8244dABEFc65b31d7dEB4f1",
      completed: 2,
      total: 3,
    },
    {
      address: "0x6a56F576669f8d20a8244dABEFc65b31d7dEB4f1",
      completed: 2,
      total: 3,
    },
    {
      address: "0x6a56F576669f8d20a8244dABEFc65b31d7dEB4f1",
      completed: 2,
      total: 3,
    },
    {
      address: "0x6a56F576669f8d20a8244dABEFc65b31d7dEB4f1",
      completed: 2,
      total: 3,
    },
    {
      address: "0x6a56F576669f8d20a8244dABEFc65b31d7dEB4f1",
      completed: 2,
      total: 3,
    },
    {
      address: "0x6a56F576669f8d20a8244dABEFc65b31d7dEB4f1",
      completed: 2,
      total: 3,
    },
  ];

  const { address: connectedAddress } = useAccount();

  const { data: challenge } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_challenge_data",
    args:[0]
  });

console.log(challenge)
  const { data: challengeCid } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_challenge_cid",
    args: [0],
  });



  const [metadataList, setMetadataList] = useState<any[]>([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadataArray = await Promise.all(
        uploadedCIDs.map(async (cid) => {
          try {
            const metadata = await getNFTMetadataFromIPFS(cid);
            return  metadata ;
          } catch (error) {
            console.error(`Error fetching metadata for CID ${cid}:`, error);
            return   null ;
          }
        })
      );
      setMetadataList(metadataArray);
    };

    fetchMetadata();
  }, [uploadedCIDs]);

  console.log(metadataList)
  return (
    <>
      <div className="flex items-center w-full flex-col">
        <div className="bg-app flex w-full justify-center">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className=" pb-10">
              <span className="text-4xl">30 Day Running Challenge</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 py-20 text-2xl">
              <div className="flex gap-10 justify-start  w-full py-10">
                <div>
                  <Image
                    src="/eth-win-1.svg"
                    alt="win challenge"
                    width={340}
                    height={340}
                  />
                </div>

                <div className="flex flex-col gap-4 justify-between pb-5">
                  <span className="text-lg">
                    Run 4 miles or 45 minutes every other day for 30 days.
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-[18px] flex gap-2 items-center">
                      <strong className="text-2xl">deadline:</strong>
                      12:00pm June, 15 2023
                    </span>
                    <span>stake: 0.05 ETH</span>
                    <span>duration: 30 days</span>
                    <span>6 participants</span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <SquadTable participants={participants} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center text-2xl gap-20">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className="py-10">
              <span className="py-10">Open Challenges</span>
              <div className="max-h-[500px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10 w-full mt-10">
                {metadataList.map((challenge, index) => (
                  <ChallengeCard
                    image={challenge.image}
                    key={index}
                    title={challenge.name}
                    description={challenge.description}
                    stake={challenge.stake}
                    spotsFilled={challenge.spotsFilled}
                  />
                ))}
              </div>
            </div>
            <div className="py-10">
              <span className="py-10">Completed Challenges</span>
              <div className="max-h-[500px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10 w-full mt-10">
                {metadataList.map((challenge, index) => (
                  <ChallengeCard
                    image={challenge.image}
                    key={index}
                    title={challenge.name}
                    description={challenge.description}
                    stake={challenge.stake}
                    spotsFilled={challenge.spotsFilled}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenges;
