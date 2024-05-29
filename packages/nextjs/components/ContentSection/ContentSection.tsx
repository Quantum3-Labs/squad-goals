import React from "react";
import Image from "next/image";

interface ContentSectionProps {
  bgColor: string;
  reverse?: boolean;
  imgSrc: string;
  textNumber: string;
  textContent: string;
  width: number;
  height: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  bgColor,
  reverse = false,
  imgSrc,
  textNumber,
  textContent,
  width,
  height,
}) => {
  return (
    <div className={`w-full flex justify-center ${bgColor}`}>
      <div
        className={`flex max-w-[1920px] justify-around items-center w-full px-5 py-10 ${reverse ? "flex-row-reverse" : ""}`}
      >
        <Image
          src={imgSrc}
          alt="vector-landing"
          width={width}
          height={height}
        />
        <div className="flex max-w-[510px] w-full gap-7">
          <span className="text-5xl font-bold">{textNumber}</span>
          <span className="text-3xl">{textContent}</span>
        </div>
      </div>
    </div>
  );
};
export default ContentSection;
