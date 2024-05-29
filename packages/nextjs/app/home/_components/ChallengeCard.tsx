import React from "react";
import Image from "next/image";

interface ChallengeCardProps {
  title: string;
  description: string;
  stake: string;
  spotsFilled: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  stake,
  spotsFilled,
}) => {
  return (
    <div className="max-w-[403px] flex w-full bg-[#BBD4FA] rounded-xl justify-center gap-3 p-3 items-center shadow-md">
      <Image
        src="/eth-win-1.svg"
        alt="winner-challenges"
        width={115}
        height={115}
      />
      <div className="text-[14px] flex flex-col gap-2">
        <span className="text-[16px] font-bold">{title}</span>
        <span className="">{description}</span>
        <div className="flex gap-3">
          <span className="font-bold">stake: {stake}</span>
          <span>{spotsFilled}/7 spots filled</span>
        </div>
        <div className="flex justify-center gap-2">
          <button className="bg-[#FFB1AC] py-1 px-5 rounded-full shadow-md">
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
