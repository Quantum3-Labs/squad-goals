"use client";
import React from "react";
import Image from "next/image";
import { formatEther } from "ethers";
import JoinChallenge from "~~/components/JoinChallenge";

interface ChallengeCardProps {
  title: string;
  description: string;
  stake: string;
  image: string;
  id: number;
  onDetails?: () => void;
  setCurrentCh?: (challenge: {
    image: string;
    id: number;
    title: string;
    description: string;
    stake: string;
  }) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  stake,
  image,
  id,
  onDetails,
  setCurrentCh, // Added to props
}) => {
  const handleSetCurrentCh = () => {
    if (setCurrentCh) {
      setCurrentCh({ title, description, stake, image, id });
    }

    if (onDetails) {
      onDetails();
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
          <JoinChallenge stake={stake} id={id} />
          <button
            className="bg-[#D1D1D1] py-1 px-5 rounded-full shadow-md"
            onClick={handleSetCurrentCh}
          >
            details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
