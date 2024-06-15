"use client";
import type { NextPage } from "next";
import ChallengeCard from "~~/app/home/_components/ChallengeCard";
import { categories, challenges } from "~~/data/data";
import { CategorySelect } from "~~/app/home/_components/CategorySelect";
import { SearchBar } from "~~/app/home/_components/SearchBar";
import { InfoCard } from "~~/app/home/_components/InfoCard";
import { getNFTMetadataFromIPFS } from "../../utils/ipfs";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";
import { formatEther } from "ethers";
import { useEffect, useState} from "react";

const App: NextPage = () => {
  const [challenges, setChallenges] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

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
        try {
          const metadata = await getNFTMetadataFromIPFS(cid);
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
  return (
    <>
      <div className="flex items-center w-full flex-col">
        <div className="bg-app flex w-full justify-center">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className="pl-20 pb-10">
              <span className="text-4xl">Open Challenges</span>
            </div>
            <div className="flex py-8 pl-20 gap-10">
              <SearchBar placeholder="search" onChange={handleSearchChange} />
              <CategorySelect categories={categories} />
            </div>
            <div className="max-h-[1040px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10">
            {challenges.map((challenge, index) => (          
                  <ChallengeCard
                    image={challenge.image}
                    id={challenge.id}
                    key={index}
                    title={challenge.name}
                    description={challenge.description}
                    stake={formatEther(challenge.stake_amount)}
                  />              
              ))}
            </div>
          </div>
        </div>
        <div className="bg-app flex w-full justify-center">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className="pl-20 pb-10">
              <span className="text-4xl">Open Challenges</span>
            </div>
            <div className="flex py-8 pl-20 gap-10">
              <SearchBar placeholder="search" onChange={handleSearchChange} />
              <CategorySelect categories={categories} />
            </div>
            <div className="max-h-[1040px] overflow-y-auto flex flex-wrap justify-center gap-5 py-10">
            {challenges.map((challenge, index) => (          
                  <ChallengeCard
                    image={challenge.image}
                    id={challenge.id}
                    key={index}
                    title={challenge.name}
                    description={challenge.description}
                    stake={formatEther(challenge.stake_amount)}
                  />              
              ))}
            </div>
          </div>
        </div>
        <div className="bg-info-card flex w-full justify-center">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <span className="text-4xl">Leaderboard</span>
            <div className="flex py-8 flex-col gap-5">
              <div className="flex justify-between">
                <span>use address</span>
                <span>completed challenges</span>
              </div>
              <div className="flex flex-col gap-4">
                <InfoCard address="0x3rwdf4twesf...234rf" value={34} />
                <InfoCard address="0x3rwdf4twesf...234rf" value={34} />
                <InfoCard address="0x3rwdf4twesf...234rf" value={34} />
                <InfoCard address="0x3rwdf4twesf...234rf" value={34} />
                <InfoCard address="0x3rwdf4twesf...234rf" value={34} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
