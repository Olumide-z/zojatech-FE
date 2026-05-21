import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-4 lg:gap-5">
      <FaCircleCheck className="text-primary shrink-0 mt-[3px]" size={16} />
      <p className="text-body-light-grey text-[15px] lg:text-[18px] leading-relaxed font-normal">
        {text}
      </p>
    </div>
  );
};

const FeatureList: React.FC = () => {
  const features = [
    'Track real-time overview of company’s financial performance.',
    'Track created projects budget against actual revenue and expenses.',
    'Highlighted reports on budget deficit and surplus, accounting dimensions, balance sheets and real-time sales margin estimation.',
  ];

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {features.map((feature, index) => (
        <FeatureItem key={index} text={feature} />
      ))}
    </div>
  );
};

export default FeatureList;
