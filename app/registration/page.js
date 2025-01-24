"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/components/Auth/Firebase/Config";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [message, setMessage] = useState("");
    const [showpas, setShowPas] = useState(false);


    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with photoURL
            await updateProfile(user, { photoURL });
            
            setMessage("Registration successful! Redirecting to login page...");
            setEmail("");
            setPassword("");
            setPhotoURL("");

            // Redirect to login page
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="group mx-auto flex w-full max-w-xl border border-blue-400 bg-white text-blue-400 shadow-lg dark:bg-zinc-900">
                <div className="relative hidden min-h-[110%] w-1/3 overflow-hidden bg-blue-400 sm:block">
                    <h1 className="absolute bottom-3 right-3 text-right text-2xl font-semibold text-white">
                        Hey! <br /> Welcome to
                        <br /> blog viewer
                    </h1>
                    <span className="absolute -left-8 -top-8 z-20 h-32 w-32 rounded-full bg-blue-800/20 duration-500 group-hover:h-56 group-hover:w-56"></span>
                    <span className="absolute -left-5 -top-5 z-10 h-36 w-36 rounded-full bg-blue-800/50"></span>
                </div>
                <form onSubmit={handleRegistration} className="flex-1 p-8">
                    <h1 className="pb-6 text-3xl font-semibold tracking-tight">Register</h1>
                    <div className="space-y-5">
                        <div className="relative text-sm">
                            <input
                                className="peer/email block w-full rounded-md border border-blue-400 bg-inherit p-2.5 shadow-lg outline-none"
                                type="email"
                                placeholder=""
                                id="navigate_ui_email_33"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label
                                className="absolute -top-2 left-2 rounded-md bg-blue-300 px-2 text-xs text-blue-600 duration-300 peer-placeholder-shown/email:top-3 peer-placeholder-shown/email:bg-transparent peer-placeholder-shown/email:text-sm peer-placeholder-shown/email:text-zinc-400 peer-focus/email:-top-2 peer-focus/email:bg-blue-300 peer-focus/email:text-xs peer-focus/email:text-blue-600"
                                htmlFor="navigate_ui_email_33"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative text-sm">
                            <div className="form-control relative">
                                <input
                                    className="peer/pass block w-full rounded-md border border-blue-400 bg-inherit p-2.5 shadow-lg outline-none"
                                    type={showpas ? "text" : "password"}
                                    id="navigate_ui_password_33"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    className="btn btn-xs absolute right-4 top-[10px] "
                                    aria-label={showpas ? "Hide password" : "Show password"}
                                    onClick={() => setShowPas(!showpas)}
                                    type="button"
                                >
                                    {showpas ? <FaEye /> : <FaEyeLowVision />}
                                </button>
                            </div>
                            <label
                                className="absolute -top-2 left-2 rounded-md bg-blue-300 px-2 text-xs text-blue-600 duration-300 peer-placeholder-shown/pass:top-3 peer-placeholder-shown/pass:bg-transparent peer-placeholder-shown/pass:text-sm peer-placeholder-shown/pass:text-zinc-400 peer-focus/pass:-top-2 peer-focus/pass:bg-blue-300 peer-focus/pass:text-xs peer-focus/pass:text-blue-600"
                                htmlFor="navigate_ui_password_33"
                            >
                                Password
                            </label>
                        </div>
                        <div className="relative text-sm">
                            <input
                                className="peer/photo block w-full rounded-md border border-blue-400 bg-inherit p-2.5 shadow-lg outline-none"
                                type="url"
                                placeholder=""
                                id="navigate_ui_photo_33"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                required
                            />
                            <label
                                className="absolute -top-2 left-2 rounded-md bg-blue-300 px-2 text-xs text-blue-600 duration-300 peer-placeholder-shown/photo:top-3 peer-placeholder-shown/photo:bg-transparent peer-placeholder-shown/photo:text-sm peer-placeholder-shown/photo:text-zinc-400 peer-focus/photo:-top-2 peer-focus/photo:bg-blue-300 peer-focus/photo:text-xs peer-focus/photo:text-blue-600"
                                htmlFor="navigate_ui_photo_33"
                            >
                                Photo URL
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="relative z-50 mb-4 mt-8 inline-block overflow-hidden rounded-md uppercase border border-blue-400 px-5 py-2 shadow-lg before:absolute before:inset-0 before:-z-10 before:block before:translate-x-full before:rounded-s-full before:bg-blue-400 before:duration-300 after:absolute after:inset-0 after:-z-10 after:block after:-translate-x-full after:rounded-e-full after:bg-blue-400 after:duration-300 hover:text-white before:hover:translate-x-0 after:hover:translate-x-0"
                    >
                        Register
                    </button>
                    {message && <p className="text-center mt-4 text-red-500">{message}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
