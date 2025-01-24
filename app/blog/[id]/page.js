    "use client";

    import React, { useEffect, useState } from "react";

    const BlogDetails = ({ params }) => {
    const { id } = params;
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await res.json();
        setPost(data);
        };
        fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="text-center">
        <h1 className="text-4xl">Blog Details</h1>
        <p className="text-2xl mt-5">{post.title}</p>
        <p className="text-lg mt-2">{post.body}</p>
        </div>
    );
    };

    export default BlogDetails;
