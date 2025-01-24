"use client";
import  { useContext } from 'react';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '@/components/context/AuthContext';
import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Navigation/Footer';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useAuth } from "@/components/context/AuthContext";

const Profile = () => {
    const { user } = useAuth();

    const handleUpdate = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const photoURL = event.target.photoURL.value;

        updateProfile(user, {
            displayName: name,
            photoURL: photoURL,
        })
        .then(() => {
            toast.success("Profile updated successfully!");
            console.log('Profile updated:', { name, photoURL });
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
            toast.error("Failed to update profile!");
        });
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex flex-col items-center mt-10 mb-7 flex-grow">
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <div className="mockup-window w-[300px] md:w-[50vw] mb-4 bg-base-300 border">
                    <div className="flex-col items-center gap-1 bg-base-200 flex justify-center px-4 py-16">
                        <h4 className='font-bold text-xl'>{user?.displayName || "not mention"}</h4>
                        <p className='font-bold text-lg sm:text-xl'>{user?.email || "not mention"}</p>
                        <Image src={user?.photoURL || ""} alt="Profile Pick" 
                        className='rounded-full'
                        width={300}
                        height={300} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleUpdate} className="bg-slate-100 p-5 shadow-xl rounded-xl form-control w-full max-w-sm">
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.displayName || ""}
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            defaultValue={user?.photoURL || ""}
                            placeholder="Enter photo URL"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            value={user?.email || ""}
                            className="input input-bordered w-full"
                            readOnly
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Update</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
