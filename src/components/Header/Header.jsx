import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ModeToggle } from "@/components/mode-toggle.jsx";
import Logo from "@/components/Header/Logo.jsx";
import { AuthContext } from "@/context/AuthContext";
import { SheetDemo } from "@/pages/Cart/SheetCart.jsx";

const Header = () => {
    const [state, setState] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const navigation = [
        { title: "Home", path: "/" },
        { title: "Product", path: "/product" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
    ];

    // Add conditional links for logged-in users
    const authenticatedNavigation = [
        { title: "Category", path: "/category" },
        { title: "List Product", path: "/productlist" },
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav
            className={`bg-white dark:bg-black text-gray-700 dark:text-gray-200 pb-3 md:pb-0 md:text-sm ${state
                    ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
                    : ""
                }`}
        >
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                {/* Logo */}
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link to="/">
                        <Logo />
                    </Link>
                    {/* Menu button for mobile */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ModeToggle />
                        <SheetDemo />
                        <button
                            className="menu-btn text-gray-500 dark:text-gray-300 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {state ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <div
                    className={`flex-1 items-center mt-4 md:mt-0 md:flex ${state ? "block" : "hidden"
                        }`}
                >
                    <ul className="justify-center items-center space-y-4 md:flex md:space-x-6 md:space-y-0">
                        {/* Public navigation links */}
                        {navigation.map((item, idx) => (
                            <li
                                key={idx}
                                className="hover:text-gray-900 dark:hover:text-gray-300"
                            >
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        ))}

                        {/* Authenticated navigation links */}
                        {user &&
                            authenticatedNavigation.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="hover:text-gray-900 dark:hover:text-gray-300"
                                >
                                    <Link to={item.path}>{item.title}</Link>
                                </li>
                            ))}
                    </ul>

                    {/* User Authentication Buttons */}
                    <div className="flex-1 gap-x-4 items-center justify-end mt-4 space-y-3 md:space-y-0 md:flex md:mt-0">
                        {user ? (
                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    Welcome, {user.username}
                                </span>
                                <RainbowButton onClick={handleLogout}>
                                    Logout
                                </RainbowButton>
                            </div>
                        ) : (
                            <Link to="/login" className="block w-full md:w-auto">
                                <RainbowButton className="w-full md:w-auto">
                                    Login
                                </RainbowButton>
                            </Link>
                        )}
                        {/* Dark Mode Toggle and Cart - Hidden on mobile as they're moved to top */}
                        <div className="hidden md:flex items-center gap-3">
                            <ModeToggle />
                            <SheetDemo />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;