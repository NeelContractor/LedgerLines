"use client"
import React from 'react';
import { PenTool, Wallet, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

const steps = [
  {
    icon: <Wallet className="w-10 h-10 text-white" />,
    title: 'Connect Your Wallet',
    description: 'Link your Solana wallet to get started. Don\'t have one? We\'ll help you set it up in seconds.'
  },
  {
    icon: <PenTool className="w-10 h-10 text-white" />,
    title: 'Write Your Entry',
    description: 'Use our beautiful editor to compose your thoughts, add images, and format your entry just how you like it.'
  },
  {
    icon: <Check className="w-10 h-10 text-white" />,
    title: 'Stored Forever',
    description: 'Your encrypted entry is stored on Solana blockchain, immutable and accessible forever.'
  }
];

const HowItWorks = () => {
    const { theme } = useTheme()

  return (
    <section id="how-it-works" className="py-20 ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SolJournal Works</h2>
          <p className=" max-w-2xl mx-auto">
            Journaling on the blockchain is simple, secure, and seamless with our intuitive process.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-purple-600 to-teal-400 transform -translate-x-1/2"></div>
          
          <div className="space-y-16 md:space-y-0 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'} md:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                  <div className={`rounded-lg ${theme == 'dark' ? "shadow-lg" : "shadow-md"} p-6 transform transition-transform duration-300 hover:scale-105 mb-8 md:mb-0`}>
                    <h3 className="text-xl font-semibold  mb-2">{step.title}</h3>
                    <p className="">{step.description}</p>
                  </div>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="rounded-full bg-gradient-to-br from-purple-600 to-teal-400 p-4 shadow-lg relative z-10">
                    {step.icon}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-purple-600 -mt-1 -mr-1 border-2 border-purple-600">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;