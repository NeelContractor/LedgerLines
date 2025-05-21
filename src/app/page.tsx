"use client"
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { ThemeSelect } from "@/components/theme-select";
import { Button } from "@/components/ui/button";
import WobbleCardFooter from "@/components/WobbleCardFooter";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return <div>
    <div className="flex justify-between">
      <h1 className="text-3xl ">LedgerLines</h1>
      <ThemeSelect />
    </div>
    <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="grid grid-cols-2 my-20">
            <div className="">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"><span className="bg-gradient-to-r from-purple-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text">Journal</span> on the <span className="bg-gradient-to-r from-purple-600 to-green-400 inline-block text-transparent bg-clip-text">blockchain</span></h1>
              <p className="text-lg text-left">Secure, immutable, and private journal entries powered by Solana. Own your memories forever with blockchain technology.</p>
              <Button
                className="mt-5"
                onClick={() => {
                  router.push('/journal')
                }}
              >Start Journaling</Button>
            </div>
            <div className="flex justify-center">
              <div className="md:w-1/2 relative ">
                <div className="relative mx-auto w-full max-w-md md:max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-teal-400/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <div className="relative  rounded-2xl shadow-xl p-6 border border-slate-600">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-bold ">Today&apos;s Journal</h3>
                        <p className="text-sm ">May 28, 2025</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                        <span className="text-xs text-teal-600 font-medium">Secured on Solana</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className=" text-sm leading-relaxed">
                        Today I finally launched my startup after months of hard work. The feeling of accomplishment is incredible. I want to remember this moment forever, which is why I&apos;m grateful to have it immutably stored on Solana...
                      </p>
                      <div className="h-24  rounded-lg flex items-center justify-center  text-sm border border-dashed border-slate-200">
                        Continue your journey...
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex items-center text-sm text-purple-600">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        Encrypted & Secured
                      </div>
                      <div className="text-xs ">
                        <span className="font-mono">tx: 4j2...8fs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <Features />
        <HowItWorks />
        <Testimonials />
        <WobbleCardFooter />
  </div>
}
