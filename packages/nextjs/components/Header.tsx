"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "~~/hooks/scaffold-stark";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import {
  Bars3Icon,
  RocketLaunchIcon,
  SquaresPlusIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "app",
    href: "/home",
    icon: <SquaresPlusIcon className="h-4 w-4" />,
  },
  {
    label: "challenges",
    href: "/challenges",
    icon: <TrophyIcon className="h-4 w-4" />,
  },
  {
    label: "launch",
    href: "/launch",
    icon: <RocketLaunchIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <div key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "border-b-4 border-black" : ""
              }   py-1.5 px-3 text-xl gap-2 flex items-center justify-center`}
            >
              <span>{label}</span>
              {icon}
            </Link>
          </div>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 z-20 px-0 sm:px-2 w-full items-center flex justify-center ">
      <div className="max-w-[1680px] w-full flex justify-between items-center">
        <div className="navbar-start w-auto lg:w-1/2">
          <Link
            href="/"
            passHref
            className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
          >
            <div className="flex relative w-10 h-10">
              <Image
                alt="Squad Goals logo"
                className="cursor-pointer"
                fill
                src="/logo.svg"
              />
            </div>
            <div className="flex flex-col items-center text-xl">
              <span>squad </span>
              <span>goals</span>
            </div>
          </Link>
        </div>
        <div className="navbar-end flex mr-4 items-center">
          <HeaderMenuLinks />
          <CustomConnectButton />
        </div>
      </div>
    </div>
  );
};
