import React from "react";
import StepsCard from "../cards/StepsCard";
import { Bike, Truck, Wallet, HandCoins } from "lucide-react";
import { useTranslations } from "next-intl";

const HowItWorksSection = () => {
    const t = useTranslations("SwiftMovePage.HowItWorksSection");

    return (
        <section
            id="how-it-works"
            className="relative flex justify-center w-full px-5 sm:px-14 py-20"
        >
            <div className="absolute top-0 left-0 bg-gradient-to-b sm:bg-gradient-to-br lg:bg-gradient-to-r from-second/50 via-first/20 to-second/50 w-full h-full -z-10"></div>
            <div className="container flex flex-col items-center w-full gap-16">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="font-semibold text-center text-xl sm:text-2xl lg:text-4xl">
                        {t("heading")}
                    </h2>
                    <p className="text-center text-sm lg:text-base">
                        {t("subheading")}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 min-[1080px]:grid-cols-3 gap-10">
                    <StepsCard
                        stepNumber={1}
                        // eslint-disable-next-line react/jsx-key
                        icons={[<Bike />, <Truck />]}
                        title={t("card1.title")}
                        text={t("card1.body")}
                        stepNumberClassName="bg-gradient-to-b sm:bg-gradient-to-br lg:bg-gradient-to-r from-second to-first"
                    />
                    <StepsCard
                        stepNumber={2}
                        // eslint-disable-next-line react/jsx-key
                        icons={[<Wallet />]}
                        title={t("card2.title")}
                        text={t("card2.body")}
                        stepNumberClassName="bg-first"
                    />
                    <StepsCard
                        stepNumber={3}
                        // eslint-disable-next-line react/jsx-key
                        icons={[<HandCoins />]}
                        title={t("card3.title")}
                        text={t("card3.body")}
                        className="sm:col-span-2 min-[1080px]:col-span-1"
                        stepNumberClassName="bg-gradient-to-b sm:bg-gradient-to-br lg:bg-gradient-to-r from-first to-second"
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
