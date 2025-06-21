// import React, {useEffect, useState} from 'react'
// import appwriteService from '../appwrite/config'
// import {Container, NoteCard} from '../components/index'
// import {useSelector} from 'react-redux'

// function Home() {

//     return (
//         <div>Home</div>
//     )

//     // const [posts, setPosts] = useState([])
//     // const [loading, setLoading] = useState(true)
//     // const authStatus = useSelector((state) => state.auth.status)

//     // useEffect(() => {
//     //     appwriteService.getPosts().then((posts) => {
//     //         if (posts) {
//     //             setPosts(posts.documents)
//     //         }
//     //         setLoading(false)
//     //     })
//     // }, [])

//     // if (loading) {
//     //     return (
//     //         <div className="w-full py-8 text-center">
//     //             <h1 className="text-xl font-semibold">Loading posts...</h1>
//     //         </div>
//     //     )
//     // }

//     // if (posts.length === 0) {
//     //     return (
//     //         <div className='w-full py-8 mt-4 text-center'>
//     //             <Container>
//     //                 <div className='flex flex-wrap'>
//     //                     <div className='p-2 w-full'>
//     //                         <h1 className='text-2xl font-bold hover:text-gray-500'>
//     //                             {authStatus ? "No posts found!" : "Login to read posts"}
//     //                         </h1>
//     //                     </div>
//     //                 </div>
//     //             </Container>
//     //         </div>
//     //     )
//     // }

//     // return (
//     //     <div className='w-full py-8'>
//     //         <Container>
//     //             <div className='flex flex-wrap'>
//     //                 {posts.map((post) => (
//     //                     <div key={post.$id} className='p-2 w-1/4'>
//     //                         <PostCard {...post} />
//     //                     </div>
//     //                 ))}
//     //             </div>
//     //         </Container>
//     //     </div>
//     // )
// }

// export default Home

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Input, Button, Container } from "../components/index";
import NoteCard from "../components/NoteCard";

function Home() {
    const userData = useSelector((state) => state.auth.userData);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setIsSearching(true);

        const res = await appwriteService.searchNotes({
            title: searchTerm,
            keywords: searchTerm,
        });

        if (res && res.documents) {
            setSearchResults(res.documents);
        } else {
            setSearchResults([]);
        }

        setIsSearching(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <Container>
                {/* Unauthenticated Welcome */}
                {!userData ? (
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to NoteBreeze 📚</h1>
                        <p className="text-gray-600 mb-6">
                            Your hub for sharing and discovering academic notes.
                        </p>
                        <Link to="/signup">
                            <Button className="text-lg px-6 py-2">Get Started</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        {/* Search Section */}
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Search Notes</h1>
                        <div className="flex gap-2 mb-6">
                            <Input
                                type="text"
                                placeholder="Search by title or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1"
                            />
                            <Button onClick={handleSearch}>Search</Button>
                        </div>

                        {/* Results */}
                        {isSearching ? (
                            <p className="text-center text-gray-500">Searching...</p>
                        ) : searchTerm.trim() ? (
                            searchResults.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {searchResults.map((note) => (
                                        <NoteCard
                                            key={note.$id}
                                            $id={note.$id}
                                            title={note.title}
                                            coverImageId={note.coverImageId}
                                            pricing={note.pricing}
                                            price={note.price}
                                            userName={note.userName}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">
                                    No notes found for &quot;{searchTerm}&quot;.
                                </p>
                            )
                        ) : (
                            <div className="text-center text-gray-400 italic">
                                Start searching to discover notes.
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;

