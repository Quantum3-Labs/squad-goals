"use client";

import type { NextPage } from "next";
import {
  BugAntIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import ContentSection from "~~/components/ContentSection/ContentSection";

const Home: NextPage = () => {
  const connectedAddress = useAccount();
  return (
    <>
      <div className="flex items-center flex-col flex-grow ">
        <div className="bg-section-1 w-full flex justify-center">
          <div className="flex max-w-[1680px] justify-around items-center w-full  px-5 py-10">
            <div className="flex flex-col max-w-[440px] w-full gap-7">
              <span className="text-4xl">
                a unique blend of blockchain technology, social community, and a
                game-like system designed to promote self-improvement and growth
              </span>
              <div className="flex items-center justify-around w-full">
                <Button className="flex bg-white rounded-full py-3 px-8 items-center justify-center gap-3">
                  <span>go to app</span>
                  <ChevronRightIcon className="w-7" />
                </Button>
                <Button className="flex bg-white rounded-full py-3 px-8 items-center justify-center gap-3">
                  <span>launch</span>
                  <RocketLaunchIcon className="w-7" />
                </Button>
              </div>
            </div>
            <Image
              src="/vector1.png"
              alt="vector 1 landing page"
              width={480}
              height={480}
            />
          </div>
        </div>
        <ContentSection
          bgColor="bg-[#8A9EA0]"
          imgSrc="/vector2.png"
          textNumber="1."
          textContent="Small groups, or squads, of 2-7 people set specific,
        measurable, achievable, relevant, and time-bound (SMART) goals
        for themselves"
          width={524}
          height={524}
        />
        <ContentSection
          bgColor="bg-section-1"
          reverse={true}
          imgSrc="/vector3.png"
          textNumber="2."
          textContent="Each person has to stake an amount of ETH crypto currency. The crypto is locked in the smart contract until the deadline is reached."
          width={414}
          height={417}
        />
        <ContentSection
          bgColor="bg-[#8A9EA0]"
          imgSrc="/vector4.png"
          textNumber="3."
          textContent="Each does their best to achieve the goal. When the deadline is passed, everyone has to vouch for each other if they have achieved their goal or not."
          width={549}
          height={332}
        />
        <ContentSection
          bgColor="bg-section-1"
          imgSrc="/vector5.png"
          reverse={true}
          textNumber="4."
          textContent="If the majority is achieved they are returned their stake and win the glory of being an owner of the Challange NFT. If not, the stake is lost, 90% to the protocol treasury and 10% to the challenge creator. "
          width={549}
          height={332}
        />
      </div>
    </>
  );
};

export default Home;
