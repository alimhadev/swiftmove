/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Leaf } from "lucide-react";

interface InvestmentCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    investmentSentence: ReactNode;
    returnOnInvestment: ReactNode;
    eco?: boolean;
}

const InvestmentCard: FC<InvestmentCardProps> = ({
    icon,
    title,
    description,
    investmentSentence,
    returnOnInvestment,
    eco = false,
}) => {
    return (
        <div
            className={`${eco ? "bg-success/10" : "bg-white"} border h-full rounded-md shadow-md`}
        >
            <div className="flex flex-col justify-between items-center w-full h-full gap-4 px-5 py-10 text-center">
                <h3 className="font-semibold text-lg">{title}</h3>
                <div
                    className={`relative flex items-center border bg-white gap-1 p-3 rounded-full shadow-md ${eco && "shadow-success/30"}`}
                >
                    {eco && (
                        <div className="absolute -top-2 -right-2 flex justify-center items-center bg-success/20 w-6 h-6 rounded-full">
                            <Leaf height={14} className="stroke-success" />
                        </div>
                    )}
                    {icon}
                </div>
                <p className="text-gray-500 text-sm text-pretty">
                    {description}
                </p>
                <div>{investmentSentence}</div>
                <div className="flex flex-col w-full gap-3 py-4">
                    <div className="border-b">Avantages</div>
                    <div>{returnOnInvestment}</div>
                </div>
                <div className="w-full">
                    <Button
                        className={`${eco ? "bg-gradient-to-r from-info to-success" : "bg-info hover:bg-info"} w-full hover:scale-105 transition`}
                    >
                        Découvrir
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InvestmentCard;
