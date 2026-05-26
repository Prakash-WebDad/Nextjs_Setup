"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/app/common/SectionWrapper";

const PLACEHOLDER_TEXTS = [
    "3-bed home with a big backyard in Austin..",
    "Modern condo near downtown Seattle..",
    "Quiet suburb with good schools in NJ..",
    "Beachfront property with ocean views..",
    "Cozy craftsman in Portland under $600k..",
    "Open-plan loft in Chicago's West Loop..",
];

const NAV_ITEMS = ["Buy", "Rent", "Sell", "Pre-approval", "Just sold", "Home value"];

const AnimatedPlaceholder: React.FC<{ inputFocused: boolean }> = ({ inputFocused }) => {
    const [index, setIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (inputFocused) return;
        const text = PLACEHOLDER_TEXTS[index];
        if (isTyping) {
            if (displayed.length < text.length) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayed(text.slice(0, displayed.length + 1));
                }, 45);
            } else {
                timeoutRef.current = setTimeout(() => setIsTyping(false), 1800);
            }
        } else {
            if (displayed.length > 0) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayed(displayed.slice(0, -1));
                }, 22);
            } else {
                setIndex((i) => (i + 1) % PLACEHOLDER_TEXTS.length);
                setIsTyping(true);
            }
        }
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [displayed, isTyping, index, inputFocused]);

    if (inputFocused) return null;

    return (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none whitespace-nowrap overflow-hidden z-[1]">
            {displayed}
            <span
                className="inline-block w-px h-[1em] bg-[#D92228] ml-px align-bottom"
                style={{ animation: "blink 0.75s step-end infinite" }}
            />
        </span>
    );
};

const HeroSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Buy");
    const [inputFocused, setInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return (
        <>
            <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            <SectionWrapper
                className="relative h-screen min-h-[600px] bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: "url('/home_bg-img.png')" }}
            >
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                    <h2 className="text-white font-extrabold text-5xl ">
                        Real Estate Platform
                    </h2>
                    <h1 className="text-white font-bold text-6xl mt-5">
                        Find Your Dream Home
                    </h1>
                    <nav aria-label="Property search categories">
                        <ul className="flex items-center gap-8 mt-5 list-none p-0 max-sm:gap-5" role="tablist">
                            {NAV_ITEMS?.map((item) => (
                                <li key={item} role="presentation">
                                    <button
                                        role="tab"
                                        aria-selected={activeTab === item}
                                        onClick={() => setActiveTab(item)}
                                        className={`relative pb-2 bg-transparent border-none cursor-pointer text-base font-medium whitespace-nowrap transition-colors duration-200 max-sm:text-sm text-white`}
                                    >
                                        {item}
                                        {activeTab === item && (
                                            <motion.div
                                                layoutId="tab-underline"
                                                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-sm"
                                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                            />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div
                        className="w-full max-w-[680px]     mt-5 bg-white rounded-full flex items-center pl-7 pr-[6px] py-[6px] max-sm:pl-5 max-sm:pr-[5px] max-sm:py-[5px]"
                        style={{
                            boxShadow: inputFocused
                                ? "0 12px 48px rgba(0,0,0,0.32), 0 0 0 3px rgba(217,34,40,0.2)"
                                : "0 8px 40px rgba(0,0,0,0.22)",
                            transition: "box-shadow 0.25s",
                        }}
                        role="search"
                    >
                        <label htmlFor="home-search" className="sr-only">
                            Search for your ideal home
                        </label>
                        <div className="flex-1 relative flex items-center min-h-[32px]">
                            <input
                                id="home-search"
                                type="search"
                                name="q"
                                autoComplete="off"
                                value={inputValue}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="absolute inset-0 w-full bg-transparent border-none outline-none text-[#1a1a1a] text-base p-0 z-[2]"
                                style={{ caretColor: "#D92228" }}
                            />
                            {!inputValue && (
                                <AnimatedPlaceholder inputFocused={inputFocused} />
                            )}
                        </div>
                        <button
                            type="submit"
                            aria-label="Search homes"
                            className="flex items-center gap-2 bg-[#D92228] hover:bg-[#c01d22] active:scale-[0.97] text-white text-base font-semibold max-sm:text-sm rounded-full border-none h-[42px] px-10 max-sm:px-5 transition-[background,transform] duration-150 flex-shrink-0 cursor-pointer"
                        >
                            Search
                            <svg className="w-[18px] h-[18px] opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="16.5" y1="16.5" x2="22" y2="22" />
                            </svg>
                        </button>
                    </div>
                    <p className="sr-only">
                        Search millions of homes for sale and rent. Browse properties by city, neighborhood, price, and more with REALTOR® certified agents.
                    </p>
                </div>
            </SectionWrapper>
        </>
    );
};

export default HeroSection;