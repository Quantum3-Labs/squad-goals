"use client";
import React from "react";
import Image from "next/image";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import { formatEther } from "ethers";

interface ChallengeCardProps {
  title: string;
  description: string;
  stake: string;
  image: string;
  id: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  stake,
  image,
  id,
}) => {
  const { data: contractData } = useDeployedContractInfo("YourContract");

  const { writeAsync: join } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Eth",
        functionName: "approve",
        args: [contractData?.address ?? "", Number(stake)],
      },
      {
        contractName: "YourContract",
        functionName: "join_challenge",
        args: [Number(id)],
      },
    ],
  });

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
    <div className="max-w-[403px] flex w-full bg-[#BBD4FA] rounded-xl justify-center gap-3 p-3 items-center shadow-md">
      <Image src={image} alt="winner-challenges" width={115} height={115} />
      <div className="text-[14px] flex flex-col gap-2">
        <span className="text-[16px] font-bold">{title}</span>
        <span className="">{description}</span>
        <div className="flex gap-3">
          <span className="font-bold">stake: {formatEther(stake)}</span>
          <span>2/7 spots filled</span>
        </div>
        <div className="flex justify-center gap-2">
          <button
            className="bg-[#FFB1AC] py-1 px-5 rounded-full shadow-md"
            onClick={wrapInTryCatch(join, "join")}
          >
            join
          </button>
          <button className="bg-[#D1D1D1] py-1 px-5 rounded-full shadow-md">
            details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
