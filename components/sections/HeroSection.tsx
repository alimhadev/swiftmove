"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { Badge } from "../ui/badge";
import { useLocale, useTranslations } from "next-intl";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
    const localActive = useLocale();
    const t = useTranslations("SwiftMovePage.HeroSection");

    const plugin = useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: true,
        })
    );

    // Redirects to sign-in
    const redirectsToSignIn = () => {
        const url = `/${localActive}/sign-in`;
        // router.replace(url);
        window.open(url, "_blank");
    };

    return (
        <section id="hero" className="relative w-full h-[fit]">
            {/* <div className="bg-black/50 backdrop-blur-sm flex justify-center w-full h-full "> */}
            <div className="relative flex justify-center w-full h-full z-10">
                <div className="container flex flex-col justify-center items-center w-full h-full gap-10 lg:gap-20 px-5 sm:px-14 py-20">
                    <Badge
                        className="font-normal text-primary text-sm lg:text-base whitespace-nowrap border-white/30 bg-white"
                        variant="outline"
                    >
                        {t("tag")}
                    </Badge>
                    <div className="flex flex-col justify-center items-center gap-8 p-10 bg-gradient-to-br from-info via-transparent to-info rounded-md">
                        <h1 className="font-bold text-white text-center text-pretty text-2xl sm:text-3xl lg:text-5xl">
                            {t("heading")}
                        </h1>
                        <p className="font-semibold text-white text-center text-pretty text-sm lg:text-base">
                            {t("subheading")}
                        </p>
                    </div>
                    <Button
                        className="flex items-center font-semibold capitalize text-white bg-gradient-to-r from-info to-success hover:scale-105 gap-2 px-10 py-6 transition"
                        onClick={redirectsToSignIn}
                    >
                        <Wallet size={20} color="white" strokeWidth={1.5} />
                        {t("button text")}
                    </Button>
                </div>
            </div>
            {/* </div> */}
            <Carousel
                opts={{ loop: true }}
                plugins={[plugin.current]}
                className="absolute top-0 left-0 w-full h-full"
            >
                <CarouselContent className="w-full h-full m-0">
                    <CarouselItem className="basis-full p-0">
                        <div className="w-full h-full bg-hero-image-2 bg-no-repeat bg-center bg-cover"></div>
                    </CarouselItem>
                    <CarouselItem className="basis-full p-0">
                        <div className="w-full h-full bg-hero-image-3 bg-no-repeat bg-center bg-cover"></div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>
    );
};

export default HeroSection;
