import React from "react";
import Image from "next/image";
import Link from "next/link";
import { menuLinks } from "~~/components/Header";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0 bg-[#8A9EA0]">
      <div className="flex w-full items-center justify-center">
        <div className="max-w-[1680px] w-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-full gap-10">
            <div className="flex flex-col items-center justify-center font-bold text-2xl">
              <Link href="https://github.com">github</Link>

              <Link href="https://twitter.com">twitter</Link>

              <Link href="https://opensea.io">opensea</Link>

              <Link href="https://producthunt.com" passHref>
                producthunt
              </Link>
            </div>
            <div>
              <Image
                src="/logo-footer.svg"
                alt="logo-footer"
                width={238}
                height={238}
              />
            </div>
            <div>
              {menuLinks.map(({ label, href, icon }) => {
                return (
                  <div key={href}>
                    <Link
                      href={href}
                      passHref
                      className="text-2xl gap-2 flex items-center justify-center"
                    >
                      <span>{label}</span>
                      {icon}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <span className="text-xl">built with 🔥 in Bali</span>
          </div>
        </div>
      </div>
    </div>
  );
};
