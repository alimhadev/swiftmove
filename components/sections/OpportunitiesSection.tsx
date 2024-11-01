"use client";

import React, { useRef } from "react";
import InvestmentCard from "../cards/InvestmentCard";
import { Bike, Car, CarTaxiFront, Ship, Train } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const OpportunitiesSection = () => {
    const t = useTranslations("SwiftMovePage.OpportunitiesSection");

    const plugin = useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: true,
        })
    );

    return (
        <section
            id="opportunities"
            className="flex justify-center w-full px-5 sm:px-14 py-20"
        >
            <div className="container flex flex-col items-center w-full gap-16">
                <div className="flex flex-col items-center w-full gap-5">
                    <h2 className="font-semibold text-xl sm:text-2xl lg:text-4xl text-center">
                        {t("heading")}
                    </h2>
                    <p className="text-sm lg:text-base text-center">
                        {t("subheading")}
                    </p>
                    <div className="flex justify-center w-full mt-5">
                        <Carousel
                            opts={{ loop: true }}
                            plugins={[plugin.current]}
                            onMouseEnter={() => plugin.current.stop()}
                            onMouseLeave={() => plugin.current.play()}
                            className="w-full max-w-[80%] hover:cursor-grab active:cursor-grabbing"
                        >
                            <CarouselContent className="py-5">
                                <CarouselItem className="basis-full min-[700px]:basis-1/2 min-[1100px]:basis-1/3">
                                    <InvestmentCard
                                        icon={<Bike height={24} />}
                                        title={t("card1.title")}
                                        description={t("card1.description")}
                                        investmentSentence={t.rich(
                                            "card1.investmentSentence",
                                            {
                                                price: t("card1.price"),
                                                duration: t("card1.duration"),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                                br: () => <br />,
                                            }
                                        )}
                                        returnOnInvestment={t.rich(
                                            "card1.advantages.return on investment",
                                            {
                                                incomePercentage: t(
                                                    "card1.advantages.incomePercentage"
                                                ),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                            }
                                        )}
                                    />
                                </CarouselItem>

                                <CarouselItem className="basis-full min-[700px]:basis-1/2 min-[1100px]:basis-1/3">
                                    <InvestmentCard
                                        icon={<Bike height={24} />}
                                        title={t("card2.title")}
                                        description={t("card2.description")}
                                        investmentSentence={t.rich(
                                            "card2.investmentSentence",
                                            {
                                                price: t("card2.price"),
                                                duration: t("card2.duration"),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                                br: () => <br />,
                                            }
                                        )}
                                        returnOnInvestment={t.rich(
                                            "card2.advantages.return on investment",
                                            {
                                                incomePercentage: t(
                                                    "card2.advantages.incomePercentage"
                                                ),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                            }
                                        )}
                                    />
                                </CarouselItem>

                                <CarouselItem className="basis-full min-[700px]:basis-1/2 min-[1100px]:basis-1/3">
                                    <InvestmentCard
                                        icon={<Bike height={24} />}
                                        title={t("card3.title")}
                                        description={t("card3.description")}
                                        investmentSentence={t.rich(
                                            "card3.investmentSentence",
                                            {
                                                price: t("card3.price"),
                                                duration: t("card3.duration"),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-transparent bg-gradient-to-r from-info to-success bg-clip-text">
                                                        {chunks}
                                                    </span>
                                                ),
                                                br: () => <br />,
                                            }
                                        )}
                                        returnOnInvestment={t.rich(
                                            "card3.advantages.return on investment",
                                            {
                                                incomePercentage: t(
                                                    "card3.advantages.incomePercentage"
                                                ),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-transparent bg-gradient-to-r from-info to-success bg-clip-text">
                                                        {chunks}
                                                    </span>
                                                ),
                                            }
                                        )}
                                        eco={true}
                                    />
                                </CarouselItem>

                                <CarouselItem className="basis-full min-[700px]:basis-1/2 min-[1100px]:basis-1/3">
                                    <InvestmentCard
                                        icon={<Car height={24} />}
                                        title={t("card4.title")}
                                        description={t("card4.description")}
                                        investmentSentence={t.rich(
                                            "card4.investmentSentence",
                                            {
                                                price: t("card4.price"),
                                                duration: t("card4.duration"),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                                br: () => <br />,
                                            }
                                        )}
                                        returnOnInvestment={t.rich(
                                            "card4.advantages.return on investment",
                                            {
                                                incomePercentage: t(
                                                    "card4.advantages.incomePercentage"
                                                ),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                            }
                                        )}
                                    />
                                </CarouselItem>

                                <CarouselItem className="basis-full min-[700px]:basis-1/2 min-[1100px]:basis-1/3">
                                    <InvestmentCard
                                        icon={<CarTaxiFront height={24} />}
                                        title={t("card5.title")}
                                        description={t("card5.description")}
                                        investmentSentence={t.rich(
                                            "card5.investmentSentence",
                                            {
                                                price: t("card5.price"),
                                                duration: t("card5.duration"),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-transparent bg-gradient-to-r from-info to-success bg-clip-text">
                                                        {chunks}
                                                    </span>
                                                ),
                                                br: () => <br />,
                                            }
                                        )}
                                        returnOnInvestment={t.rich(
                                            "card5.advantages.return on investment",
                                            {
                                                incomePercentage: t(
                                                    "card5.advantages.incomePercentage"
                                                ),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-transparent bg-gradient-to-r from-info to-success bg-clip-text">
                                                        {chunks}
                                                    </span>
                                                ),
                                            }
                                        )}
                                        eco={true}
                                    />
                                </CarouselItem>

                                <CarouselItem className="basis-full min-[700px]:basis-1/2 min-[1100px]:basis-1/3">
                                    <InvestmentCard
                                        icon={<Train height={24} />}
                                        title={t("card6.title")}
                                        description={t("card6.description")}
                                        investmentSentence={t.rich(
                                            "card6.investmentSentence",
                                            {
                                                price: t("card6.price"),
                                                duration: t("card6.duration"),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                                br: () => <br />,
                                            }
                                        )}
                                        returnOnInvestment={t.rich(
                                            "card6.advantages.return on investment",
                                            {
                                                incomePercentage: t(
                                                    "card6.advantages.incomePercentage"
                                                ),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                            }
                                        )}
                                    />
                                </CarouselItem>

                                <CarouselItem className="basis-full min-[700px]:basis-1/2 min-[1100px]:basis-1/3">
                                    <InvestmentCard
                                        icon={<Ship height={24} />}
                                        title={t("card7.title")}
                                        description={t("card7.description")}
                                        investmentSentence={t.rich(
                                            "card7.investmentSentence",
                                            {
                                                price: t("card7.price"),
                                                duration: t("card7.duration"),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                                br: () => <br />,
                                            }
                                        )}
                                        returnOnInvestment={t.rich(
                                            "card7.advantages.return on investment",
                                            {
                                                incomePercentage: t(
                                                    "card7.advantages.incomePercentage"
                                                ),
                                                span: (chunks) => (
                                                    <span className="font-bold text-xl text-info">
                                                        {chunks}
                                                    </span>
                                                ),
                                            }
                                        )}
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="w-14 h-14 hover:scale-[1.2] transition" />
                            <CarouselNext className="w-14 h-14 hover:scale-[1.2] transition" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpportunitiesSection;
