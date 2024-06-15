"use client";
import type { NextPage } from "next";
import ChallengeInput from "~~/app/launch/_components/ChallengeInput";
import ImageUpload from "~~/app/launch/_components/ImageUpload";
import Image from "next/image";
import SquadTable from "~~/app/challenges/_components/SquardTable";
import { challenges } from "~~/data/data";
import ChallengeCard from "~~/app/home/_components/ChallengeCard";
import { useEffect, useState} from "react";
import { getNFTMetadataFromIPFS } from "../../utils/ipfs";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";

import { metadata } from "../layout";
const Challenges: NextPage = () => {

  const [challenges, setChallenges] = useState<any[]>([]);


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

  const {data: events} = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "contracts::YourContract::YourContract::ChallengeCreated",
    fromBlock: 0n,
  });
   console.log(events)
   useEffect(() => {
    const fetchChallenges = async () => {
      if (!events) return;

      const challengesData = await Promise.all(events.map(async (event) => {
        const cid = event.args.cid;
        console.log(cid)
        try {
          const metadata = await getNFTMetadataFromIPFS(cid);
          console.log(metadata)
          return {
            ...metadata,
            ...event.args, 
          };
        } catch (error) {
          console.error(`Error fetching metadata for CID ${cid}:`, error);
          return null;
        }
      }));
      setChallenges(challengesData.filter(Boolean));
    };

    fetchChallenges();
  }, [events]);

console.log(challenges)
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
              {challenges.map((challenge, index) => {
                return(
                  (      
                    <ChallengeCard
                      image={challenge}
                      id= {challenge.id}
                      key={index}
                      title={challenge.name}
                      description={challenge.description}
                      stake={challenge.stake_amount}
                    />       
                ))}
                )
              }
              </div>
            </div>
            <div className="py-10">
              <span className="py-10">Completed Challenges</span>
              <div className="max-h-[500px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10 w-full mt-10">
              {challenges.map((challenge, index) => (          
                  <ChallengeCard
                    image={challenge}
                    id= {challenge.id}
                    key={index}
                    title={challenge.name}
                    description={challenge.description}
                    stake={challenge.stake_amount}
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
