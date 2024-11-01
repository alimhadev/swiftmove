"use client";

import Link from "next/link";
import { Menu, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import LanguagesSelect from "../selects/LanguagesSelect";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const localActive = useLocale();
    const t = useTranslations("SwiftMovePage.Header");
    const router = useRouter();

    // Navigation links
    const navLinks = [
        {
            href: `/${localActive}`,
            text: t("links.link1"),
            id: "hero",
        },
        {
            href: `/${localActive}/#how-it-works`,
            text: t("links.link2"),
            id: "how-it-works",
        },
        {
            href: `/${localActive}/#opportunities`,
            text: t("links.link3"),
            id: "opportunities",
        },
        {
            href: `/${localActive}/#advantages`,
            text: t("links.link4"),
            id: "advantages",
        },
    ];

    // Redirects to sign-up
    const redirectsToSignUp = () => {
        const url = `/${localActive}/sign-up`;
        // router.replace(url);
        window.open(url, "_blank");
    };

    // Redirects to sign-in
    const redirectsToSignIn = () => {
        const url = `/${localActive}/sign-in`;
        // router.replace(url);
        window.open(url, "_blank");
    };

    const scrollToSection = (e: any, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            id="header"
            className="sticky top-0 flex justify-center bg-white w-full sm:px-14 py-3 shadow-md z-50"
        >
            <div className="container flex justify-between items-center w-full px-5">
                <div className="flex items-center gap-5">
                    <h1 className="font-bold text-xl">SwiftMove</h1>
                    <div className="hidden min-[1125px]:block">
                        <LanguagesSelect />
                    </div>
                </div>
                <div className="flex items-center gap-10">
                    <nav className="hidden min-[750px]:flex gap-8">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.id)}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                    <div className="hidden min-[1125px]:flex gap-3">
                        <Button
                            className="bg-info hover:bg-info hover:scale-105 transition"
                            onClick={redirectsToSignUp}
                        >
                            {t("button1 text")}
                        </Button>
                        <Button
                            className="flex items-center capitalize bg-gradient-to-r from-info to-success hover:scale-105 gap-2 transition"
                            onClick={redirectsToSignIn}
                        >
                            <Wallet size={20} color="white" strokeWidth={1.5} />
                            {t("button2 text")}
                        </Button>
                    </div>
                </div>
                <motion.button
                    className="block min-[1125px]:hidden"
                    onClick={() => setToggleMenu((prev) => !prev)}
                    whileTap={{ scale: 0.9 }}
                >
                    <Menu size={24} color="black" />
                </motion.button>
                <motion.div
                    animate={{
                        opacity: toggleMenu ? 1 : 0,
                        x: toggleMenu ? 0 : "100%",
                        scale: toggleMenu ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.2, ease: "easeIn" }}
                    className={`absolute right-0 top-full min-[1125px]:hidden flex flex-col items-center bg-white border gap-3 p-10 rounded-md z-10`}
                >
                    <nav className="flex min-[750px]:hidden flex-col gap-4">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-center"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex min-[1125px]:hidden flex-col gap-3">
                        <div className="w-full">
                            <LanguagesSelect />
                        </div>
                        <Button
                            className="bg-info hover:bg-info hover:scale-105 transition"
                            onClick={redirectsToSignUp}
                        >
                            {t("button1 text")}
                        </Button>
                        <Button
                            className="flex items-center capitalize bg-gradient-to-r from-info to-success hover:scale-105 gap-2 transition"
                            onClick={redirectsToSignIn}
                        >
                            <Wallet size={20} color="white" strokeWidth={1.5} />
                            {t("button2 text")}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
