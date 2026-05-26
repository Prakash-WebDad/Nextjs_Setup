"use client";
import SectionWrapper from "@/app/common/SectionWrapper";
import {
    BadgeDollarSign,
    Calculator,
    HandCoins,
} from "lucide-react";

const tabs = ["Buying", "Renting", "Selling"];

const cards = [
    {
        title: "Find out how much you can afford",
        description:
            "We'll help you estimate your budget range. Save to your buyer profile to help in your search.",
        button: "Try our affordability calculator",
        icon: BadgeDollarSign,
    },
    {
        title: "Understand your monthly costs",
        description:
            "Get an in-depth look at what your monthly and closing costs will look like based on your financial situation and goals.",
        button: "Try our mortgage calculator",
        icon: Calculator,
    },
    {
        title: "Get help with your down payment",
        description:
            "You may be able to buy a home with just 3.5% down. Saving for that can be challenging—down payment assistance programs can help.",
        button: "Find down payment help",
        icon: HandCoins,
    },
];

export default function DiscoverHelpSection() {
    return (
        <SectionWrapper className="max-w-7xl mx-auto px-4 md:px-6  md:py-16">
            <h2 className="text-2xl font-bold text-[#141414]">
                Discover how we can help
            </h2>
            <div className="flex items-center gap-2 mt-5 overflow-x-auto scrollbar-hide">
                {tabs?.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-6 py-2 rounded-full border text-lg font-medium whitespace-nowrap transition-all duration-200 ${index === 0
                            ? "border-[#141414] bg-[#f4f1ed] text-[#141414]"
                            : "border-[#d7d7d7] bg-white text-[#141414]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
                {cards?.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="border border-[#d8d8d8] rounded-md bg-white p-6  flex flex-col justify-between min-h-[200px]"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-lg font-semibold leading-snug text-[#141414] max-w-[260px]">
                                        {card.title}
                                    </h3>
                                    <Icon
                                        size={46}
                                        className="text-[#D92228] flex-shrink-0"
                                        strokeWidth={2.2}
                                    />
                                </div>
                                <p className=" text-md mt-6">
                                    {card.description}
                                </p>
                            </div>
                            <button className="mt-10 text-left text-[#141414] text-xl font-semibold underline underline-offset-4 hover:text-[#D92228] transition-colors">
                                {card.button}
                            </button>
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}