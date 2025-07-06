import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaShoppingCart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from './Container';
import Context from '../context/Context';

const Header = ({ setShowCart }) => {
    const { accessToken, logout, user, cart } = useContext(Context);
    const { t, i18n } = useTranslation();
    const [showProfile, setShowProfile] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const langDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Language options
    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
                setShowLanguageDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Set document direction based on language
    useEffect(() => {
        document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    // Window resize handler
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setShowLanguageDropdown(false);
    };

    const cartProductsCount = useCallback(() => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }, [cart]);

    const handleShowCart = (e) => {
        e.stopPropagation();
        setShowCart(prev => !prev);
    };

    // Animation variants
    const menuVariants = {
        initial: { x: '-100%' },
        animate: {
            x: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
                delay: 0.2,
                type: 'spring',
                stiffness: 190,
                damping: 20
            }
        },
    };

    const dropdownVariants = {
        initial: { opacity: 0, y: -10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2 }
        }
    };

    return (
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
            <Container className="flex justify-between items-center h-[70px] px-6 py-1.5">
                {/* Mobile menu button */}
                <GiHamburgerMenu
                    className="text-2xl cursor-pointer md:hidden"
                    onClick={() => setOpen(true)}
                />

                {/* Logo */}
                <h1 className="text-2xl font-bold uppercase font-poppins bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">elegant</h1>

                {/* Mobile menu */}
                <motion.nav
                    variants={menuVariants}
                    initial="initial"
                    animate={windowWidth < 767 && open ? "animate" : ""}
                    ref={menuRef}
                    className={`absolute top-0 ${open && windowWidth < 767 ? 'left-0' : '-left-full'} h-screen pt-22 z-30 bg-gradient-to-br from-teal-600 to-cyan-600 w-[300px] max-w-[80vw] text-white md:hidden`}
                >
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-5 right-4 text-2xl cursor-pointer border-none outline-none md:hidden"
                    >
                        <IoCloseSharp />
                    </button>
                    <ul className="flex flex-col justify-center gap-6 items-center relative pt-16">
                        {['home', 'collection', 'about', 'contact'].map((item) => (
                            <li
                                key={item}
                                onClick={() => setOpen(false)}
                                className="capitalize font-medium transition-all relative whitespace-nowrap"
                            >
                                <NavLink to={`/${item === 'home' ? '' : item}`}>
                                    {t(`nav.${item}`)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </motion.nav>

                {/* Desktop navigation */}
                <nav className="hidden md:block">
                    <ul className="flex justify-center gap-6 items-center relative">
                        {['home', 'collection', 'about', 'contact'].map((item) => (
                            <li
                                key={item}
                                className="capitalize font-medium transition-all relative whitespace-nowrap"
                            >
                                <NavLink to={`/${item === 'home' ? '' : item}`}>
                                    {t(`nav.${item}`)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right side icons */}
                <div className="flex gap-4 items-center">
                    {/* Language dropdown */}
                    <div className="relative" ref={langDropdownRef}>
                        <button
                            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                            className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 hover:bg-teal-50 hover:border-teal-300 transition-colors"
                        >
                            {i18n.language === 'en' ? '🇬🇧 EN' : '🇸🇦 AR'}
                            {showLanguageDropdown ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                        </button>

                        <motion.div
                            variants={dropdownVariants}
                            initial="initial"
                            animate={showLanguageDropdown ? "animate" : "exit"}
                            className="absolute top-full mt-1 right-0 bg-white shadow-lg rounded-md p-1 z-50 min-w-[120px] border border-slate-100"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`w-full text-left px-4 py-2 rounded-md hover:bg-teal-50 flex items-center gap-2 ${i18n.language === lang.code ? 'bg-teal-50 text-teal-600' : ''
                                        }`}
                                >
                                    <span>{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Profile dropdown */}
                    <div className="relative">
                        {accessToken ? (
                            <>
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="flex items-center gap-1"
                                >
                                    <CgProfile size={24} />
                                    {windowWidth > 768 && (
                                        <span className="text-sm">{user.name}</span>
                                    )}
                                </button>
                                {showProfile && (
                                    <motion.ul
                                        variants={dropdownVariants}
                                        initial="initial"
                                        animate={showProfile ? "animate" : "exit"}
                                        className="absolute top-full mt-1 right-0 bg-white shadow-lg rounded-md p-1 z-50 min-w-[120px] border border-gray-100"
                                    >
                                        {user?.isAdmin && (
                                            <li>
                                                <button
                                                    onClick={() => navigate('/dashboard')}
                                                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
                                                >
                                                    Dashboard
                                                </button>
                                            </li>
                                        )}
                                        <li>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setShowProfile(false);
                                                }}
                                                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 text-red-500"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </motion.ul>
                                )}
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="flex items-center gap-1"
                                >
                                    <CgProfile size={24} />
                                </button>
                                {showProfile && (
                                    <motion.ul
                                        variants={dropdownVariants}
                                        initial="initial"
                                        animate={showProfile ? "animate" : "exit"}
                                        className="absolute top-full mt-1 right-0 bg-white shadow-lg rounded-md p-1 z-50 min-w-[120px] border border-gray-100"
                                    >
                                        <li>
                                            <button
                                                onClick={() => {
                                                    navigate('/login');
                                                    setShowProfile(false);
                                                }}
                                                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
                                            >
                                                Login
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    navigate('/register');
                                                    setShowProfile(false);
                                                }}
                                                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
                                            >
                                                Sign Up
                                            </button>
                                        </li>
                                    </motion.ul>
                                )}
                            </>
                        )}
                    </div>

                    {/* Cart icon */}
                    <div
                        className="relative cursor-pointer hover:-translate-y-0.5 transition-transform"
                        onClick={handleShowCart}
                    >
                        <FaShoppingCart size={20} />
                        {cartProductsCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                                {cartProductsCount()}
                            </span>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;