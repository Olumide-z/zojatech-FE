import React from 'react';
import Button from './Button';

interface SuccessStateProps {
    title: string;
    description: string;
    imageSrc: string;
}
const SuccessState: React.FC<SuccessStateProps> = ({ title, description, imageSrc }) => {
    return (
        <div className="w-full flex flex-col justify-center max-w-[489px]">
            <div className="w-full bg-white border border-[#DDE2E4] rounded-lg shadow-[10px_50px_50px_rgba(0,0,0,0.06)] p-6 md:p-10 max-h-167.5 select-none">
                <img src={imageSrc} alt={title} className="w-[70px] h-[60px] rounded-full object-contain" />
                <h3 className="text-center font-bold text-body-action">{title}</h3>
                <p className="text-center text-body-light-grey">{description}</p>
                <Button
                    type="submit"
                    className="mt-6 w-fit! px-6 py-3.5"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default SuccessState;
