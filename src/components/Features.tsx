import React from 'react';
import { Lock, CloudLightning, Clock, Globe, Shield, CreditCard } from 'lucide-react';

const features = [
  {
    icon: <Lock className="w-6 h-6 text-purple-600" />,
    title: 'Private & Encrypted',
    description: 'Your entries are encrypted end-to-end. Only you have the keys to access your journal.'
  },
  {
    icon: <CloudLightning className="w-6 h-6 text-purple-600" />,
    title: 'Solana Speed',
    description: 'Lightning-fast transactions ensure your memories are stored instantly and efficiently.'
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-600" />,
    title: 'Timestamped Memories',
    description: 'Each entry is immutably timestamped on the blockchain, creating a verifiable timeline.'
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-600" />,
    title: 'Permanent Storage',
    description: 'Your journal entries are stored forever on the blockchain, immune to data loss.'
  },
  {
    icon: <Globe className="w-6 h-6 text-purple-600" />,
    title: 'Access Anywhere',
    description: 'Securely access your journal from any device, anywhere in the world.'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-purple-600" />,
    title: 'Low Transaction Fees',
    description: 'Solana\'s efficient infrastructure means minimal costs for storing your memories.'
  }
];

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className=" rounded-xl p-6 shadow-sm border  hover:shadow-md transition-shadow duration-300 group">
      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors duration-300">
        <div className="group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold  mb-2">{title}</h3>
      <p className="">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Journal on Solana?</h2>
          <p className=" max-w-2xl mx-auto">
            Experience the next generation of personal journaling with blockchain technology that ensures your memories are secure, private, and truly yours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;