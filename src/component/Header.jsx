import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { SiShopee } from 'react-icons/si';
import { PiShoppingBagOpenFill } from 'react-icons/pi';

const Header = ({ handleSearch }) => {
    const { user } = false;

    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="sticky top-0 z-10 py-4 px-12 flex flex-row gap-2 justify-between items-center bg-white max-sm:px-2 shadow-md">
            {/* Logo */}
            <Link to="/">
                {/* <SiShopee className='text-[#EE4D2D] h-8 w-8 '/> */}
                <PiShoppingBagOpenFill className='text-[#EE4D2D] h-10 w-10 ' />
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-6 text-base-bold max-lg:hidden">
                <Link
                    to="/"
                    className={`hover:text-[#EE4D2D] text-[#EE4D2D] text-lg`}
                >
                    Trang chủ
                </Link>
                <Link
                    to={user ? "/" : "/"}
                    className={`hover:text-[#EE4D2D] text-lg`}
                >
                    Yêu thích
                </Link>
                <Link
                    to={user ? "/" : "/"}
                    className={`hover:text-[#EE4D2D] text-lg`}
                >
                    Đơn hàng
                </Link>
            </div>

            {/* Search Box */}
            <div className="flex basis-1/4 gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
                <input
                    className="outline-none flex-grow"
                    placeholder="Tìm kiếm..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(query);
                        }
                    }}
                />
                <button
                    onClick={() => handleSearch(query)}
                >
                    <FaSearch className="cursor-pointer h-4 w-4 hover:text-[#EE4D2D]" />
                </button>
            </div>

            {/* User and Cart Icons */}
            <div className="relative flex gap-3 items-center">
                <Link
                    to="/"
                    className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-[#EE4D2D] hover:text-white max-md:hidden"
                >
                    <FaShoppingCart className="h-5 w-5" />
                    <p className="text-base-bold">Giỏ</p>
                </Link>

                <FaBars
                    className="cursor-pointer lg:hidden h-5 w-5"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />

                {dropdownMenu && (
                    <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
                        <Link to="/" className="hover:text-[#EE4D2D]">
                            <div className="text-xl">Home</div>
                        </Link>
                        <Link
                            to={user ? "/" : "/"}
                            className="hover:text-[#EE4D2D]"
                        >
                            <div className="text-xl">Wishlist</div>

                        </Link>
                        <Link
                            to={user ? "/" : "/"}
                            className="hover:text-[#EE4D2D]"
                        >
                            <div className="text-xl">Orders</div>

                        </Link>
                        <Link
                            to="/"
                            className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-[#EE4D2D] hover:text-white"
                        >
                            <FaShoppingCart className="h-5 w-5 text-[#EE4D2D]" />
                            <p className="text-base-bold text-[#EE4D2D]">Cart</p>
                        </Link>
                    </div>
                )}

                {user ? (
                    <FaUserCircle className='' />
                ) : (
                    <Link to="/">
                        <FaUserCircle className="h-6 w-6" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
