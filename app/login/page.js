"use client";
import { useRef, useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Navigation/Footer";
import Navbar from "@/components/Navigation/Navbar";
import { auth } from "@/components/Auth/Firebase/Config";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from 'react-icons/fa6';
import { sendPasswordResetEmail } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [showpas, setShowPas] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const emailRef = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to the homepage or dashboard
            router.push("/");
        } catch (err) {
            setError("Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };
    // sign in with google
    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // Redirect to the homepage or dashboard
            router.push("/");
        } catch (err) {
            setError("Failed to log in with Google.");
        } finally {
            setLoading(false);
        }
    };
    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please provide your email address."); // Check if email is empty
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email); // Firebase password reset method
            alert("Password reset email sent! Please check your inbox.");
        } catch (err) {
            console.error("Error during password reset:", err.message);
            setError("Failed to send password reset email.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center">
                {/* <div><Image src="" alt="Img" /></div> */}
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        className="input input-bordered"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        className="input input-bordered"
                                        type={showpas ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        className="btn btn-xs absolute right-4 top-12"
                                        aria-label={showpas ? "Hide password" : "Show password"}
                                        onClick={() => setShowPas(!showpas)}
                                        type="button"
                                    >
                                        {showpas ? <FaEye /> : <FaEyeLowVision />}
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="text-sm text-blue-500 hover:underline"
                                        onClick={handleForgotPassword}
                                        type="button"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="form-control mt-6 gap-2">
                                    <button  
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={loading}>
                                        {loading ? "Loading..." : "Submit"}
                                    </button>
                                </div>
                                <Link href="/registration">Not have acount go Registration</Link>
                    </form>
                    <button
                                onClick={handleGoogleSignIn}
                                className="btn bg-cyan-300 mb-2 mx-8"
                            >
                                Login with Google
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

