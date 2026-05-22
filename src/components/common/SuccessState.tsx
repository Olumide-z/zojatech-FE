import React from 'react';
import Button from './Button';

interface SuccessStateProps {
    title: string;
    description: string;
    imageSrc: string;
    onClickEvent: () => void;
}
const SuccessState: React.FC<SuccessStateProps> = ({ title, description, imageSrc, onClickEvent }) => {
    return (
        <div className='flex items-center flex-col'>
                <img src={imageSrc} alt={title} className="w-[70px] h-[60px] object-contain mb-4" />
                <h3 className="text-center font-bold text-body-action md:text-[24px] text-[20px]">{title}</h3>
                <p className="text-center text-body-light-grey text-[13px]">{description}</p>
                <Button
                    type="submit"
                    className="mt-6 w-fit! px-8! py-3"
                    onClick={() => onClickEvent()}
                >
                    Continue
                </Button>
           </div>
    );
};

export default SuccessState;
