import RegisterForm from "@/components/forms/register-form";
import { useLocale } from "next-intl";
import React from "react";

const Page = () => {
    const localActive = useLocale();

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-second/40 via-transparent to-first/40 w-full min-h-full h-fit py-10 px-5 gap-10">
            <span className="font-bold text-2xl">SwiftMove</span>
            <RegisterForm />
            <div className="text-center">
                Vous avez déjà un compte ?{" "}
                <a
                    href={`/${localActive}/sign-in`}
                    className="font-bold text-info"
                >
                    Connectez-vous
                </a>
            </div>
        </div>
    );
};

export default Page;
