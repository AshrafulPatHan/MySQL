"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/public/Group 5.svg";
import { useAuth } from "@/components/context/AuthContext";
import { auth } from "../Auth/Firebase/Config"; 
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user } = useAuth();
    const router = useRouter(); 

    const handleLogout = async () => {
        try {
            await signOut(auth); 
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <nav className="sticky top-0 z-50">
            <div >
                <div className="flex flex-row items-center justify-between mx-[5vw] mb-16 pt-3">
                    {/* Logo */}
                    <div className="flex flex-row items-center">
                        <Image
                            src={Logo}
                            alt="Logo"
                            className="w-[35px] md:w-[40px] xl:w-[50px]"
                        />
                        <h4 className="text-xl font-medium">
                            blog viewer
                        </h4>
                    </div>
                    {/* desktop /tav vu */}
                    <div className="hidden lg:flex lg:flex-row items-center text-green-500 text-xl font-light gap-5">
                        <Link className="hover:text-blue-500 hover:bg-green-400 p-3  " href="/">Home</Link>
                        <Link className="hover:text-blue-500 hover:bg-green-400 p-3  " href="/">About As</Link>
                        <Link className="hover:text-blue-500 hover:bg-green-400 p-3  " href="/profile">Profile</Link>
                        <div>
                            {user ? (
                                <div className="flex flex-row items-center gap-1 md:gap-2">
                                    <div
                                        className="tooltip tooltip-bottom"
                                        data-tip={user.displayName || "User"}
                                    >
                                        <Image
                                            src={user.photoURL || "/default-avatar.png"}
                                            alt={user.displayName || "User"}
                                            width={40} // Add width
                                            height={40}
                                            className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                                        />
                                    </div>
                                    <button
                                        className="btn text-sky-600"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login">Login</Link>
                            )}
                        </div>
                    </div>
                    {/* mobile vu */}
                    <div className="dropdown dropdown-end lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost ">
                            {user ? (
                                        <div className="tooltip" data-tip={user.displayName || "User"}>
                                        <Image
                                            src={user.photoURL || "/default-avatar.png"}
                                            alt={user.displayName || "User"}
                                            width={40} // Add width
                                            height={40}
                                            className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                                        />
                                        </div>
                                ) : (
                                    <FaRegUserCircle className='text-4xl' />
                                )}
                            </div>
                                {user ? (
                                    <ul tabIndex={0}
                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <div className="tooltip" data-tip={user.displayName || "User"}>
                                        <Image
                                            src={user.photoURL || "/default-avatar.png"}
                                            alt={user.displayName || "User"}
                                            width={40} // Add width
                                            height={40}
                                            className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                                        />
                                        </div>
                                        <Link className="text-xl text-green-500" href="/">Home</Link>
                                        <Link className="text-xl text-green-500" href="/">About Me</Link>
                                        <Link className="text-xl text-green-500 mb-2" href="/">Contact</Link>
                                        <button onClick={handleLogout} className="btn text-sky-600">
                                            Log out
                                        </button>
                                    </ul>
                                ) : (
                                    <ul tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                        <Link className="text-xl text-green-500" href="/">Home</Link>
                                        <Link className="text-xl text-green-500" href="/">About Me</Link>
                                        <Link className="text-xl text-green-500" href="/">Contact</Link>
                                        <Link className="text-xl text-green-500" href="/login">Login</Link>
                                    </ul>
                                )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
