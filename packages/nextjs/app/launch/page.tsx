"use client";
import type { NextPage } from "next";
import ChallengeInput from "~~/app/launch/_components/ChallengeInput";
import ImageUpload from "~~/app/launch/_components/ImageUpload";

const Launch: NextPage = () => {
  const handleImageUpload = (file: File) => {
    console.log("Uploaded file:", file);
  };
  return (
    <>
      <div className="flex items-center w-full flex-col">
        <div className="bg-info-card flex w-full justify-center">
          <div className="max-w-[1680px] h-full p-10 w-full flex flex-col">
            <div className=" pb-10">
              <span className="text-4xl">Launch Your Own Challenge</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 py-20">
              <div className="flex justify-between w-full text-xl gap-4">
                <div className="flex flex-col gap-5 flex-1">
                  <ChallengeInput
                    name="name"
                    placeholder="every challenge must have a name"
                  />
                  <div className="flex flex-col gap-2">
                    <span>description</span>
                    <textarea
                      className="max-w-[560px] rounded-md border-2 border-black px-4 py-3 h-[240px]"
                      placeholder="make sure it is SMART; specific, measurable, achievable, relevant, time bound."
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5 flex-1">
                  <ChallengeInput
                    name="duration"
                    placeholder="how long the challenge is open in days"
                  />
                  <ChallengeInput
                    name="ETH Stake "
                    placeholder="Required deposit to participate, e.g. 0.05 ETH"
                  />
                  <ChallengeInput
                    name="Tags"
                    placeholder="study, fitness, leetcode, running, weight lifting"
                  />
                </div>
              </div>
              <span className="text-xl">NFT Image</span>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Launch;
