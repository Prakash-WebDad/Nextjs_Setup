"use client";
import { useState } from "react";
import Link from "next/link";
import {
    ChevronDown,
    Menu,
    X,
} from "lucide-react";

type DropdownItem = {
    label: string;
    href: string;
};

type NavItem = {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
    {
        label: "Buy",
        dropdown: [
            { label: "Homes for sale", href: "#" },
            { label: "Foreclosure homes", href: "#" },
        ],
    },
    {
        label: "Sell",
        dropdown: [
            { label: "Post property", href: "#" },
            { label: "Owner dashboard", href: "#" },
        ],
    },
    {
        label: "Rent",
        dropdown: [
            { label: "Apartments", href: "#" },
            { label: "Vacation homes", href: "#" },
        ],
    },
    {
        label: "Projects",
        dropdown: [
            { label: "New launches", href: "#" },
            { label: "Featured builders", href: "#" },
        ],
    },
];

function Header() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <header
            className="w-full bg-white sticky top-0 z-50 relative "
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                            L
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold leading-none">
                                LandEstate
                            </h2>
                        </div>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems?.map((item) => (
                            <div
                                key={item?.label}
                                onMouseEnter={() =>
                                    setActiveDropdown(item?.label)
                                }
                            >
                                <button className="flex items-center gap-1 text-[15px] font-medium h-16 border-b-2 border-transparent hover:border-black transition">
                                    {item?.label}

                                    <ChevronDown size={15} />
                                </button>
                            </div>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <button className="text-sm font-medium hover:text-black/70">
                            Log in
                        </button>

                        <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
                            Sign up
                        </button>
                    </div>

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="lg:hidden"
                    >
                        {mobileMenu ? (
                            <X size={26} />
                        ) : (
                            <Menu size={26} />
                        )}
                    </button>
                </div>
            </div>
            {activeDropdown && (
                <div className="absolute left-0 top-16 w-full">
                    <div className="bg-white shadow  rounded-b-[20px] border-t border-gray-200 overflow-hidden">
                        <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-3 gap-16">
                            <div>
                                <h3 className="text-[15px] font-semibold mb-3">
                                    Homes for sale
                                </h3>
                                <div className="space-y-1">
                                    {navItems
                                        ?.find(
                                            (item) =>
                                                item?.label === activeDropdown
                                        )
                                        ?.dropdown?.map((subItem) => (
                                            <Link
                                                key={subItem?.label}
                                                href={subItem?.href}
                                                className="block text-[15px] text-gray-700 hover:text-black transition"
                                            >
                                                {subItem?.label}
                                            </Link>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[15px] font-semibold mb-3">
                                    Explore the neighborhood
                                </h3>

                                <div className="space-y-1">
                                    <Link
                                        href="#"
                                        className="block text-[15px] text-gray-700 hover:text-black transition"
                                    >
                                        Housing market trends
                                    </Link>

                                    <Link
                                        href="#"
                                        className="block text-[15px] text-gray-700 hover:text-black transition"
                                    >
                                        Recently sold homes
                                    </Link>

                                    <Link
                                        href="#"
                                        className="block text-[15px] text-gray-700 hover:text-black transition"
                                    >
                                        Property records
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[15px] font-semibold mb-3">
                                    Home buying tips
                                </h3>

                                <div className="space-y-1">
                                    <Link
                                        href="#"
                                        className="block text-[15px] text-gray-700 hover:text-black transition"
                                    >
                                        Home buying checklist
                                    </Link>
                                    <Link
                                        href="#"
                                        className="block text-[15px] text-gray-700 hover:text-black transition"
                                    >
                                        First-time buyer guide
                                    </Link>

                                    <Link
                                        href="#"
                                        className="block text-[15px] text-gray-700 hover:text-black transition"
                                    >
                                        Investment success stories
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {mobileMenu && (
                <div className="lg:hidden border-t bg-white">
                    <div className="px-4 py-5 space-y-5">
                        {navItems?.map((item) => (
                            <div key={item?.label}>
                                <h3 className="font-semibold mb-3">
                                    {item?.label}
                                </h3>

                                <div className="space-y-2 pl-2">
                                    {item?.dropdown?.map((subItem) => (
                                        <Link
                                            key={subItem?.label}
                                            href={subItem?.href}
                                            className="block text-gray-600"
                                        >
                                            {subItem?.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col gap-3 pt-4">
                            <button className="border rounded-full py-3 font-medium">
                                Log in
                            </button>

                            <button className="bg-black text-white rounded-full py-3 font-medium">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;