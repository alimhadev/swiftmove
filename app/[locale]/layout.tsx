import { AppProvider } from "@/hooks/appProvider";
import "@/styles/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { QueryProvider } from "@/components/client-provider";
export default async function LocaleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <QueryProvider>
                <AppProvider>

                    {children}
                </AppProvider>
            </QueryProvider>
        </NextIntlClientProvider>
    );
}
