import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ReactCountryFlag from "react-country-flag";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl";

const LanguagesSelect = () => {
    const router = useRouter();
    const localActive = useLocale();
    const pathname = usePathname();
    const [selectedLanguage, setSelectedLanguage] = useState(localActive);
    const pathnameWithoutIntl = pathname.slice(4);

    const handleChangeLanguage = () => {
        let trueLanguage = "";
        trueLanguage = selectedLanguage === "fr" ? "en" : "fr";
        router.replace(`/${trueLanguage}/${pathnameWithoutIntl}`);
    };

    return (
        <Select
            value={selectedLanguage}
            onValueChange={(lang) => {
                setSelectedLanguage(lang);
                handleChangeLanguage();
            }}
        >
            <SelectTrigger className="w-full focus:ring-0">
                <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">
                    <ReactCountryFlag
                        countryCode="US"
                        svg
                        style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                        }}
                        title="US"
                    />
                    <span>English</span>
                </SelectItem>
                <SelectItem value="fr">
                    <ReactCountryFlag
                        countryCode="FR"
                        svg
                        style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                        }}
                        title="US"
                    />
                    <span>Français</span>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

export default LanguagesSelect;
