import Image from "next/image";
import { WobbleCard } from "./ui/wobble-card";

export default function WobbleCardFooter() {
    return <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
              <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className="max-w-sm">
                    <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Secure, immutable, and private journal entries powered by Solana blockchain technology.
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        With over 100,000 mothly active users, LedgerLines is the most
                        popular Journal Platform on Solana.
                    </p>
                    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        © 2025 SolJournal. All rights reserved.
                    </p>
                </div>
                <Image
                    src="/website.png"
                    width={500}
                    height={500}
                    alt="LedgerLines"
                    className="absolute -right-10 md:-right-[4%] lg:-right-[2%] -bottom-10 object-contain rounded-2xl"
                />
              </WobbleCard>
    </div>
}