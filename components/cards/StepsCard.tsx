import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

interface StepsCardProps {
    stepNumber: number;
    icons: ReactNode[];
    title: string;
    text: string;
    className?: string;
    stepNumberClassName?: string;
}

const StepsCard: FC<StepsCardProps> = ({
    stepNumber,
    icons,
    title,
    text,
    className,
    stepNumberClassName,
}) => {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center bg-white gap-3 border p-5 rounded-lg shadow",
                className
            )}
        >
            <div
                className={cn(
                    "absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 flex justify-center items-center bg-primary text-primary-foreground w-10 h-10 rounded-full",
                    stepNumberClassName
                )}
            >
                {stepNumber}
            </div>
            <div className="flex items-center">
                <h3 className="font-semibold text-center text-xl">{title}</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
                <div className="flex justify-center gap-3">
                    {icons.map((icon, index) => (
                        <div key={index}>{icon}</div>
                    ))}
                </div>
                <p className="text-center">{text}</p>
            </div>
        </div>
    );
};

export default StepsCard;
