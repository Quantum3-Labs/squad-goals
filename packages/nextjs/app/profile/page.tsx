"use client";
import type { NextPage } from "next";
import { challengesItems } from "~~/data/data";
import ChallengeCard from "~~/app/home/_components/ChallengeCard";
import Stats from "~~/app/profile/_components/Stats";
import { CardItem } from "~~/app/profile/_components/CardItem";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";
import { getNFTMetadataFromIPFS } from "~~/utils/ipfs";

const Profile: NextPage = () => {
  const { address } = useAccount();

  const [challenges, setChallenges] = useState<any[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<any[]>([]);

  const { data: chJoined } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "contracts::YourContract::YourContract::ChallengeJoined",
    fromBlock: 0n,
  });

  const { data: chCompleted } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "contracts::YourContract::YourContract::ChallengeCompleted",
    fromBlock: 0n,
  });

  useEffect(() => {
    const fetchChallenges = async (chs: any[] | undefined) => {
      if (!chs) return [];

      return Promise.all(
        chs.map(async (event) => {
          const cid = event.args.cid;
          console.log(cid);
          try {
            const metadata = await getNFTMetadataFromIPFS(cid);
            console.log(metadata);
            return {
              ...metadata,
              ...event.args,
            };
          } catch (error) {
            console.error(`Error fetching metadata for CID ${cid}:`, error);
            return null;
          }
        }),
      );
    };

    fetchChallenges(chJoined).then((chs) => setChallenges(chs));
    fetchChallenges(chCompleted).then((chs) => setCompletedChallenges(chs));
  }, [chJoined, chCompleted]);

  return (
    <>
      <div className="flex items-center w-full flex-col text-black">
        <div className="bg-app flex w-full justify-center items-center flex-col">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col gap-10">
            <div className="flex items-center justify-center pb-10">
              <span className="text-xl font-bold">{address}</span>
            </div>
            <div className="flex justify-around items-center py-10 ">
              <Stats
                primaryValue={34}
                secondaryValue={"14%"}
                tertiaryValue={5}
                primaryText="Completed Challenges"
                secondaryText="Top % Percent"
                tertiaryText="Challenges Authored"
              />
              <div className=" flex flex-col items-center gap-10 text-6xl font-medium">
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>14 ETH</span>
                  <span className="text-2xl">ETH Staked</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>98%</span>
                  <span className="text-2xl">% Percent of challenges won</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>2.3 ETH</span>
                  <span className="text-2xl">
                    Earned from Authored Challenges
                  </span>
                </div>
              </div>
              <Stats
                primaryValue={340}
                secondaryValue={"Coding"}
                tertiaryValue={10}
                primaryText="Leaderboard Position"
                secondaryText="Top Category"
                tertiaryText="Challanges Initiated"
              />
            </div>
            <div className=" pt-10 w-full">
              <span className="text-5xl text-start w-full">
                Reward NFTs Collected:
              </span>
            </div>
            <div className="max-h-[900px] overflow-y-auto flex flex-wrap justify-center gap-20 py-10 w-full mt-10">
              {challengesItems.map((item, index) => (
                <CardItem key={index} title={item.title} imageUrl={item.src} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center text-2xl gap-20">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className="py-10">
              <span className="py-10 text-3xl">Challenges In Progress</span>
              <div className="max-h-[500px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10 w-full mt-10">
                {challenges.map((challenge, index) => (
                  <ChallengeCard
                    key={index}
                    id={challenge.cid}
                    title={challenge.title}
                    description={challenge.description}
                    stake={challenge.stake_amount}
                    image={challenge.image}
                  />
                ))}
              </div>
            </div>
            <div className="py-10">
              <span className="py-10 text-3xl">Completed Challenges</span>
              <div className="max-h-[500px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10 w-full mt-10">
                {completedChallenges.map((challenge, index) => (
                  <ChallengeCard
                    id={challenge.cid}
                    key={index}
                    image={challenge.image}
                    title={challenge.title}
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

export default Profile;
