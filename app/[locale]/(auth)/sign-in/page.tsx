import LoginForm from "@/components/forms/login-form";
import { useLocale } from "next-intl";
import React from "react";

const Page = () => {
    const localActive = useLocale();

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-info/40 via-transparent to-info/40 w-full min-h-full h-fit py-10 px-5 gap-10">
            <span className="font-bold text-2xl">SwiftMove</span>
            <LoginForm />
            <div className="text-center">
                Vous n'avez pas encore de compte ?{" "}
                <a
                    href={`/${localActive}/sign-up`}
                    className="font-bold text-info"
                >
                    Inscrivez-vous
                </a>
            </div>
        </div>
    );
};

export default Page;
