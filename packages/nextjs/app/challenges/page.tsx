"use client";
import type { NextPage } from "next";
import Image from "next/image";
import SquadTable from "~~/app/challenges/_components/SquardTable";
import ChallengeCard from "~~/app/home/_components/ChallengeCard";
import { useEffect, useState } from "react";
import { getNFTMetadataFromIPFS } from "../../utils/ipfs";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";
import JoinChallenge from "~~/components/JoinChallenge";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { validateAndParseAddress } from "starknet";

const Challenges: NextPage = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<any[]>([]);
  const [currentCh, setCurrentCh] = useState<any>(null);

  const { data: events } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "contracts::YourContract::YourContract::ChallengeCreated",
    fromBlock: 0n,
  });

  const { data: chCompleted } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "contracts::YourContract::YourContract::ChallengeCompleted",
    fromBlock: 0n,
  });

  const { data: getChallengeStakers } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_challenge_stakers",
    args: [Number(currentCh?.id ?? 0)],
  });

  const { data: getChallengeData } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_challenge_data",
    args: [Number(currentCh?.id ?? 0)],
  });

  const daysLeft = getChallengeData?.[2]
    ? (() => {
        const deadline = new Date(Number(getChallengeData[2] ?? 0) * 1000);
        const now = new Date();
        const timeDiff = deadline.getTime() - now.getTime();
        const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
        return `${daysLeft} days`;
      })()
    : "0 days";

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

    fetchChallenges(events).then((chs) => setChallenges(chs));
    fetchChallenges(chCompleted).then((chs) => setCompletedChallenges(chs));
  }, [events, chCompleted]);

  return (
    <>
      <div className="flex items-center w-full flex-col">
        <div className="bg-app flex w-full justify-center">
          {currentCh && (
            <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
              <div className=" pb-10">
                <span className="text-4xl">{currentCh.title}</span>
              </div>
              <div className="flex flex-col justify-center items-center gap-5 py-20 text-2xl">
                <div className="flex gap-10 justify-start  w-full py-10">
                  <div>
                    <Image
                      src={currentCh.image}
                      alt="win challenge"
                      width={340}
                      height={340}
                    />
                  </div>

                  <div className="flex flex-col gap-4 justify-between pb-5">
                    <span className="text-lg">{currentCh.description}</span>
                    <div className="flex flex-col gap-2">
                      <span className="text-[18px] flex gap-2 items-center">
                        <strong className="text-2xl">deadline:</strong>
                        {getChallengeData?.[2]
                          ? new Date(
                              Number(getChallengeData[2] ?? 0) * 1000,
                            ).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                          : "No time found"}
                      </span>
                      <span>stake: {currentCh.stake} ETH</span>
                      <span>duration: {daysLeft}</span>
                      <span>6 participants</span>
                    </div>
                    <JoinChallenge stake={currentCh.stake} id={currentCh.id} />
                  </div>
                </div>
                <div className="w-full">
                  <SquadTable
                    participants={
                      getChallengeStakers?.map((it: string) => ({
                        address: validateAndParseAddress(it.toString()),
                        completed: 1,
                        total: 3,
                      })) ?? []
                    }
                  />
                </div>
                <button
                  className="bg-[#D1D1D1] py-1 px-5 rounded-full shadow-md"
                  disabled={getChallengeData?.[3] === true}
                >
                  Verify
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full justify-center text-2xl gap-20">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className="py-10">
              <span className="py-10">Open Challenges</span>
              <div className="max-h-[500px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10 w-full mt-10">
                {challenges
                  .filter((ch) => !completedChallenges.includes(ch.cid))
                  .map((challenge, index) => {
                    return (
                      <ChallengeCard
                        image={challenge.image}
                        id={challenge.id}
                        key={index}
                        title={challenge.name}
                        description={challenge.description}
                        stake={challenge.stake_amount}
                        setCurrentCh={setCurrentCh}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="py-10">
              <span className="py-10">Completed Challenges</span>
              <div className="max-h-[500px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10 w-full mt-10">
                {completedChallenges.map((challenge, index) => (
                  <ChallengeCard
                    image={challenge.image}
                    id={challenge.id}
                    key={index}
                    title={challenge.name}
                    description={challenge.description}
                    stake={challenge.stake_amount}
                    setCurrentCh={setCurrentCh}
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
