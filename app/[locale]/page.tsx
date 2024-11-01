import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import OpportunitiesSection from "@/components/sections/OpportunitiesSection";
import TestimonySection from "@/components/sections/TestimonySection";
import WhyUsSection from "@/components/sections/WhyUsSection";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <Header />
            <HeroSection />
            <WhyUsSection />
            <HowItWorksSection />
            <OpportunitiesSection />
            <AdvantagesSection />
            <TestimonySection />
            <Footer />
        </main>
    );
}
