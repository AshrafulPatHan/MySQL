"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await res.json();
            setPosts(data);
        };
        fetchData();
    }, []);

    const handleViewDetails = (id) => {
        router.push(`/blog/${id}`); 
    };

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mb-7 mx-3">
                {posts.map((post) => (
                    <div className="mx-auto text-white" key={post.id}>
                        <div className="w-[300px] lg:w-[400px] 2xl:w-[20vw] h-[200px] p-4 border-2 border-neutral-800">
                            <div className="flex flex-col text-center items-center">
                                <p className="text-2xl">Title:</p>
                                <p>{post.title}</p>
                            </div>
                            <button
                                className="mt-3 p-3 hover:bg-[#ccb9b9] hover:text-black border-2 border-spacing-2"
                                onClick={() => handleViewDetails(post.id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
