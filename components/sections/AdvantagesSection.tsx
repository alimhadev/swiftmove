import React from "react";
import IconTextCard from "../cards/IconTextCard";
import { RefreshCw, ShieldCheck, Sprout, TrendingUp } from "lucide-react";
import AdvantagesSectionChart from "../charts/AdvantagesSectionChart";
import { useTranslations } from "next-intl";

const AdvantagesSection = () => {
    const t = useTranslations("SwiftMovePage.AdvantagesSection");

    return (
        <section
            id="advantages"
            className="flex justify-center bg-gradient-to-r from-success/5 via-white to-success/5 w-full px-5 sm:px-14 py-20 shadow-xl"
        >
            <div className="container flex flex-col items-center w-full gap-10">
                <div className="flex flex-col items-center gap-4">
                    <h2 className="font-semibold text-xl sm:text-2xl lg:text-4xl text-center">
                        {t("heading")}
                    </h2>
                    <p className="text-sm lg:text-base text-center">
                        {t("subheading")}
                    </p>
                </div>
                <div className="flex items-center w-full gap-5">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <IconTextCard
                            icon={<TrendingUp />}
                            title={t("card1.title")}
                            hasBody={false}
                        />
                        <IconTextCard
                            icon={<RefreshCw />}
                            title={t("card2.title")}
                            hasBody={false}
                        />
                        <IconTextCard
                            icon={<Sprout />}
                            title={t("card3.title")}
                            hasBody={false}
                        />
                        <IconTextCard
                            icon={<ShieldCheck />}
                            title={t("card4.title")}
                            hasBody={false}
                        />
                    </div>
                    <div className="hidden lg:block w-1/2">
                        <AdvantagesSectionChart />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdvantagesSection;
