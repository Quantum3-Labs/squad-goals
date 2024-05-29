import React from "react";

interface InfoCardProps {
  address: string;
  value: number;
}

export const InfoCard: React.FC<InfoCardProps> = ({ address, value }) => {
  return (
    <div className="bg-[#BBD4FA] w-full flex justify-between py-4 px-8 rounded-full">
      <span className="font-bold">{address}</span>
      <span>{value}</span>
    </div>
  );
};
