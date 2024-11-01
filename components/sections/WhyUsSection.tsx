import React from "react";
import IconTextCard from "../cards/IconTextCard";
import { Leaf, DollarSign, Globe } from "lucide-react";
import { Badge } from "../ui/badge";
import WhyUsSectionChart from "../charts/WhyUsSectionChart";
import { useTranslations } from "next-intl";

const WhyUsSection = () => {
    const t = useTranslations("SwiftMovePage.WhyUsSection");

    return (
        <section className="flex justify-center w-full px-5 sm:px-14 py-20">
            <div className="container flex flex-col items-center gap-16">
                <div className="flex flex-col items-center w-full gap-5">
                    <Badge
                        className="font-normal text-primary text-sm lg:text-base whitespace-nowrap"
                        variant="outline"
                    >
                        {t("tag")}
                    </Badge>
                    <h2 className="font-semibold text-xl sm:text-2xl lg:text-4xl text-center">
                        {t("heading")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 min-[1080px]:grid-cols-3 gap-4 mt-5">
                        <IconTextCard
                            className="flex-col items-center text-center border-success/50 gap-2"
                            icon={<Leaf className="stroke-success" />}
                            title={t("card1.title")}
                            body={t("card1.body")}
                        />
                        <IconTextCard
                            className="flex-col items-center text-center border-info/50 gap-2"
                            icon={<DollarSign className="stroke-info" />}
                            title={t("card2.title")}
                            body={t("card2.body")}
                        />
                        <IconTextCard
                            className="flex-col items-center text-center border-success/50 gap-2 sm:col-span-2 min-[1080px]:col-span-1"
                            icon={<Globe className="stroke-success" />}
                            title={t("card3.title")}
                            body={t("card3.body")}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-3/4">
                    <WhyUsSectionChart />
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;
