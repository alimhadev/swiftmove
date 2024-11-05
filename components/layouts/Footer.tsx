import React from "react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import TelegramIcon from "@/public/assets/telegram-icon.svg";
import Image from "next/image";
import swiftmoveLogo from "@/public/assets/swiftmove-logo.png";

const Footer = () => {
    const t = useTranslations("SwiftMovePage.Footer");

    return (
        <footer className="flex justify-center bg-first text-primary-foreground w-full px-5 sm:px-14 pt-20 pb-10">
            <div className="container flex flex-col gap-20">
                <div className="flex flex-wrap justify-between gap-20 w-full">
                    <div className="flex flex-col gap-4">
                        <h2 className="flex items-center gap-[2px] font-bold text-2xl">
                            <Image
                                src={swiftmoveLogo}
                                alt="swiftmove logo"
                                width={65}
                            />
                            SwiftMove
                        </h2>
                        <q>
                            &nbsp;<b>Rapide</b> sur la route, <b>rentable</b>{" "}
                            dans vos poches&nbsp;
                        </q>
                    </div>
                    <div className="flex flex-wrap gap-10 sm:gap-20 lg:gap-40">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold">{t("col1.title")}</h3>
                            <div className="flex flex-col gap-2">
                                <Link href="#">{t("col1.link1")}</Link>
                                <Link href="#how-it-works">
                                    {t("col1.link2")}
                                </Link>
                                <Link href="#opportunities">
                                    {t("col1.link3")}
                                </Link>
                                <Link href="#advantages">
                                    {t("col1.link4")}
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold">{t("col2.title")}</h3>
                            <div className="flex flex-col gap-2">
                                <Dialog>
                                    <DialogTrigger className="text-start">
                                        {t("col2.link1.title")}
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <div className="flex flex-col items-center gap-5">
                                                <DialogTitle className="uppercase">
                                                    {t("col2.link1.title")}
                                                </DialogTitle>
                                                <ScrollArea className="w-full max-h-[600px] px-5">
                                                    <DialogDescription className="flex flex-col text-primary gap-4">
                                                        <div className="border-b pb-3">
                                                            <p className="font-semibold text-pretty text-justify">
                                                                {t(
                                                                    "col2.link1.dialog.intro"
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.1.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t(
                                                                    "col2.link1.dialog.1.description"
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.2.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.2.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.3.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.3.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.4.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.4.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.5.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.5.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.6.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.6.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.7.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.7.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.8.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.8.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.9.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.9.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.10.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.10.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.11.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.11.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.12.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.12.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link1.dialog.13.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.13.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.conclusion1",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col gap-2 pb-3">
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link1.dialog.conclusion2",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    </DialogDescription>
                                                </ScrollArea>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger className="text-start">
                                        {t("col2.link2.title")}
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <div className="flex flex-col items-center gap-5">
                                                <DialogTitle className="uppercase">
                                                    {t("col2.link2.title")}
                                                </DialogTitle>
                                                <ScrollArea className="w-full max-h-[600px] px-5">
                                                    <DialogDescription className="flex flex-col text-primary gap-4">
                                                        <div className="border-b pb-3">
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.intro",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.1.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.1.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.2.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.2.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.3.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.3.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.4.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.4.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.5.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.5.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.6.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.6.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.7.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.7.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.8.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.8.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <h3 className="font-semibold text-lg">
                                                                {t(
                                                                    "col2.link2.dialog.9.title"
                                                                )}
                                                            </h3>
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.9.description",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col border-b gap-2 pb-3">
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.conclusion1",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col gap-2 pb-3">
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link2.dialog.conclusion2",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    </DialogDescription>
                                                </ScrollArea>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger className="text-start">
                                        {t("col2.link3.title")}
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <div className="flex flex-col items-center gap-5">
                                                <DialogTitle className="uppercase">
                                                    {t("col2.link3.title")}
                                                </DialogTitle>
                                                <ScrollArea className="w-full max-h-[600px] px-5">
                                                    <DialogDescription className="flex flex-col text-primary gap-4">
                                                        <div className="flex flex-col gap-2 pb-3">
                                                            <p className="text-pretty text-justify">
                                                                {t.rich(
                                                                    "col2.link3.dialog.1",
                                                                    {
                                                                        br: () => (
                                                                            <br />
                                                                        ),
                                                                        b: (
                                                                            chunks
                                                                        ) => (
                                                                            <b>
                                                                                {
                                                                                    chunks
                                                                                }
                                                                            </b>
                                                                        ),
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    </DialogDescription>
                                                </ScrollArea>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold">{t("col3.title")}</h3>
                            <div className="flex flex-col gap-2">
                                <p>{t("col3.link1")}</p>
                                <p>
                                    <a
                                        href="https://t.me/+7JZN7j-RdXwwYzk0"
                                        target="_blank"
                                        className="flex items-center gap-1"
                                    >
                                        {t("col3.link2")}
                                        <TelegramIcon className="h-10" />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t pt-3">
                    <p className="font-thin text-sm text-white/70">
                        Copyright | 2024
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
