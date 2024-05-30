import React from "react";

interface StatsProps {
  primaryValue: number;
  primaryText: string;
  secondaryValue: string;
  secondaryText: string;
  tertiaryValue: number;
  tertiaryText: string;
}

const Stats: React.FC<StatsProps> = ({
  primaryValue,
  primaryText,
  secondaryValue,
  secondaryText,
  tertiaryValue,
  tertiaryText,
}) => {
  return (
    <div className="flex flex-col text-6xl gap-40 font-medium py-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <span>{primaryValue}</span>
        <span className="text-2xl">{primaryText}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <span>{secondaryValue}</span>
        <span className="text-2xl">{secondaryText}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <span>{tertiaryValue}</span>
        <span className="text-2xl">{tertiaryText}</span>
      </div>
    </div>
  );
};

export default Stats;
