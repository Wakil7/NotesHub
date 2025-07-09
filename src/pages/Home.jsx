// // // import React, {useEffect, useState} from 'react'
// // // import appwriteService from '../appwrite/config'
// // // import {Container, NoteCard} from '../components/index'
// // // import {useSelector} from 'react-redux'

// // // function Home() {

// // //     return (
// // //         <div>Home</div>
// // //     )

// // //     // const [posts, setPosts] = useState([])
// // //     // const [loading, setLoading] = useState(true)
// // //     // const authStatus = useSelector((state) => state.auth.status)

// // //     // useEffect(() => {
// // //     //     appwriteService.getPosts().then((posts) => {
// // //     //         if (posts) {
// // //     //             setPosts(posts.documents)
// // //     //         }
// // //     //         setLoading(false)
// // //     //     })
// // //     // }, [])

// // //     // if (loading) {
// // //     //     return (
// // //     //         <div className="w-full py-8 text-center">
// // //     //             <h1 className="text-xl font-semibold">Loading posts...</h1>
// // //     //         </div>
// // //     //     )
// // //     // }

// // //     // if (posts.length === 0) {
// // //     //     return (
// // //     //         <div className='w-full py-8 mt-4 text-center'>
// // //     //             <Container>
// // //     //                 <div className='flex flex-wrap'>
// // //     //                     <div className='p-2 w-full'>
// // //     //                         <h1 className='text-2xl font-bold hover:text-gray-500'>
// // //     //                             {authStatus ? "No posts found!" : "Login to read posts"}
// // //     //                         </h1>
// // //     //                     </div>
// // //     //                 </div>
// // //     //             </Container>
// // //     //         </div>
// // //     //     )
// // //     // }

// // //     // return (
// // //     //     <div className='w-full py-8'>
// // //     //         <Container>
// // //     //             <div className='flex flex-wrap'>
// // //     //                 {posts.map((post) => (
// // //     //                     <div key={post.$id} className='p-2 w-1/4'>
// // //     //                         <PostCard {...post} />
// // //     //                     </div>
// // //     //                 ))}
// // //     //             </div>
// // //     //         </Container>
// // //     //     </div>
// // //     // )
// // // }

// // // export default Home

// // import React, { useState } from "react";
// // import { useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import appwriteService from "../appwrite/config";
// // import { Input, Button, Container } from "../components/index";
// // import NoteCard from "../components/NoteCard";

// // function Home() {
// //     const userData = useSelector((state) => state.auth.userData);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [searchResults, setSearchResults] = useState([]);
// //     const [isSearching, setIsSearching] = useState(false);

// //     const handleSearch = async () => {
// //         if (!searchTerm.trim()) return;

// //         setIsSearching(true);

// //         const res = await appwriteService.searchNotes({
// //             title: searchTerm,
// //             keywords: searchTerm,
// //         });

// //         if (res && res.documents) {
// //             setSearchResults(res.documents);
// //         } else {
// //             setSearchResults([]);
// //         }

// //         setIsSearching(false);
// //     };

// //     return (
// //         <div className="min-h-screen bg-gray-50 py-10 my-10">
// //             <Container>
// //                 {/* Unauthenticated Welcome */}
// //                 {!userData ? (
// //                     <div className="text-center py-20">
// //                         <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to NotesHub 📚</h1>
// //                         <p className="text-gray-600 mb-6">
// //                             Your hub for sharing and discovering academic notes.
// //                         </p>
// //                         <Link to="/signup">
// //                             <Button className="text-lg px-6 py-2">Get Started</Button>
// //                         </Link>
// //                     </div>
// //                 ) : (
// //                     <div className="max-w-2xl mx-auto">
// //                         {/* Search Section */}
// //                         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Search Notes</h1>
// //                         <div className="flex gap-2 mb-6">
// //                             <Input
// //                                 type="text"
// //                                 placeholder="Search by title or keywords..."
// //                                 value={searchTerm}
// //                                 onChange={(e) => setSearchTerm(e.target.value)}
// //                                 className="flex-1"
// //                             />
// //                             <Button onClick={handleSearch}>Search</Button>
// //                         </div>

// //                         {/* Results */}
// //                         {isSearching ? (
// //                             <p className="text-center text-gray-500">Searching...</p>
// //                         ) : searchTerm.trim() ? (
// //                             searchResults.length > 0 ? (
// //                                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //                                     {searchResults.map((note) => (
// //                                         <NoteCard
// //                                             key={note.$id}
// //                                             $id={note.$id}
// //                                             title={note.title}
// //                                             coverImageId={note.coverImageId}
// //                                             pricing={note.pricing}
// //                                             price={note.price}
// //                                             userName={note.userName}
// //                                         />
// //                                     ))}
// //                                 </div>
// //                             ) : (
// //                                 <p className="text-center text-gray-500">
// //                                     No notes found for &quot;{searchTerm}&quot;.
// //                                 </p>
// //                             )
// //                         ) : (
// //                             <div className="text-center text-gray-400 italic">
// //                                 Start searching to discover notes.
// //                             </div>
// //                         )}
// //                     </div>
// //                 )}
// //             </Container>
// //         </div>
// //     );
// // }

// // export default Home;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Input, Button, Container } from "../components/index";
// import NoteCard from "../components/NoteCard";

// function Home() {
//     const userData = useSelector((state) => state.auth.userData);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const [visibleQuotes, setVisibleQuotes] = useState([]);
//     const [searchClicked, setSearchClicked] = useState(false);

//     const quotes = [
//         "The beautiful thing about learning is nobody can take it away from you. — B.B. King",
//         "Education is the most powerful weapon you can use to change the world. — Nelson Mandela",
//         "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
//         "Live as if you were to die tomorrow. Learn as if you were to live forever. — Mahatma Gandhi",
//         "Knowledge is power. — Francis Bacon",
//         "Study hard, for the well is deep, and our brains are shallow. — Richard Baxter",
//         "The expert in anything was once a beginner. — Helen Hayes",
//         "You don’t have to be great to start, but you have to start to be great. — Zig Ziglar",
//         "Learning never exhausts the mind. — Leonardo da Vinci",
//         "Develop a passion for learning. If you do, you will never cease to grow. — Anthony J. D’Angelo",
//     ];



//     const getRandomQuotes = () => {
//         const shuffled = [...quotes].sort(() => 0.5 - Math.random());
//         return shuffled.slice(0, 3);
//     };

//     useEffect(() => {
//         setVisibleQuotes(getRandomQuotes());
//         const interval = setInterval(() => {
//             setVisibleQuotes(getRandomQuotes());
//         }, 7000);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         if (searchTerm.trim() === "") {
//             setSearchResults([]);
//             setSearchClicked(false);
//         }
//     }, [searchTerm]);

//     const handleSearch = async () => {
//         if (!searchTerm.trim()) return;

//         setSearchClicked(true); // Mark that search button was clicked
//         setIsSearching(true);

//         const res = await appwriteService.searchNotes({
//             title: searchTerm,
//             keywords: searchTerm,
//         });

//         setSearchResults(res?.documents || []);
//         setIsSearching(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-10 my-10">
//             <Container>
//                 {/* Unauthenticated Welcome */}
//                 {!userData ? (
//                     <div className="text-center py-20">
//                         <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to NotesHub 📚</h1>
//                         <p className="text-gray-600 mb-6">
//                             Your hub for sharing and discovering academic notes.
//                         </p>
//                         <Link to="/signup">
//                             <Button className="text-lg px-6 py-2">Get Started</Button>
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="max-w-2xl mx-auto">
//                         {/* Search Section */}
//                         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Search Notes</h1>
//                         <div className="flex gap-2 mb-6">
//                             <Input
//                                 type="text"
//                                 placeholder="Search by title or keywords..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="flex-1"
//                             />
//                             <Button onClick={handleSearch}>Search</Button>
//                         </div>

//                         {/* Results */}
//                         {isSearching ? (
//                             <p className="text-center text-gray-500">Searching...</p>
//                         ) : searchClicked ? (
//                             searchResults.length > 0 ? (
//                                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                                     {searchResults.map((note) => (
//                                         <NoteCard
//                                             key={note.$id}
//                                             $id={note.$id}
//                                             title={note.title}
//                                             coverImageId={note.coverImageId}
//                                             pricing={note.pricing}
//                                             price={note.price}
//                                             userName={note.userName}
//                                         />
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <p className="text-center text-gray-500">
//                                     No notes found for &quot;{searchTerm}&quot;.
//                                 </p>
//                             )
//                         ) : (
//                             <div className="text-center text-gray-400 italic">
//                                 Start searching to discover notes.
//                             </div>
//                         )}
//                         {/* ✅ Quotes Section */}
//                         {!searchTerm.trim() && (
//                             <div className="mt-20">
//                                 <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
//                                     Inspire Your Learning Journey ✨
//                                 </h2>
//                                 <div className="space-y-3 max-w-3xl mx-auto text-center text-gray-600 italic text-md">
//                                     {visibleQuotes.map((quote, index) => (
//                                         <p key={index} className="opacity-80">{quote}</p>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </Container>
//         </div>
//     );
// }

// export default Home;


import React, { useState, useEffect } from "react";
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
    const [searchClicked, setSearchClicked] = useState(false);
    const [visibleQuotes, setVisibleQuotes] = useState([]);

    const quotes = [
        "The beautiful thing about learning is nobody can take it away from you. — B.B. King",
        "Education is the most powerful weapon you can use to change the world. — Nelson Mandela",
        "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
        "Live as if you were to die tomorrow. Learn as if you were to live forever. — Mahatma Gandhi",
        "Knowledge is power. — Francis Bacon",
        "Study hard, for the well is deep, and our brains are shallow. — Richard Baxter",
        "The expert in anything was once a beginner. — Helen Hayes",
        "You don’t have to be great to start, but you have to start to be great. — Zig Ziglar",
        "Learning never exhausts the mind. — Leonardo da Vinci",
        "Develop a passion for learning. If you do, you will never cease to grow. — Anthony J. D’Angelo",
    ];

    // Rotate 3 random quotes every 7 seconds
    const getRandomQuotes = () => {
        const shuffled = [...quotes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    useEffect(() => {
        setVisibleQuotes(getRandomQuotes());
        const interval = setInterval(() => {
            setVisibleQuotes(getRandomQuotes());
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    // Reset if searchTerm is cleared
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSearchResults([]);
            setSearchClicked(false);
        }
    }, [searchTerm]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setSearchClicked(true);
        setIsSearching(true);

        const res = await appwriteService.searchNotes({
            title: searchTerm,
            keywords: searchTerm,
        });

        setSearchResults(res?.documents || []);
        setIsSearching(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 my-10">
            <Container>
                {/* Welcome section for unauthenticated users */}
                {/* 👤 If user is not logged in */}
                {!userData && (
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to NotesHub 📚</h1>
                        <p className="text-gray-600 mb-6">
                            Your hub for sharing and discovering academic notes.
                        </p>
                        <Link to="/signup">
                            <Button className="text-lg px-6 py-2">Get Started</Button>
                        </Link>
                    </div>
                )}

                {/* 🔍 Search section for logged-in users only */}
                {userData && (
                    <div className="max-w-2xl mx-auto">
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

                        {isSearching ? (
                            <p className="text-center text-gray-500">Searching...</p>
                        ) : searchClicked ? (
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

                {/* ✨ Quotes section: visible for both guests and users unless searchClicked */}
                {!searchClicked && (
                    <div className="mt-20">
                        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
                            Inspire Your Learning Journey ✨
                        </h2>
                        <div className="space-y-3 max-w-3xl mx-auto text-center text-gray-600 italic text-md">
                            {visibleQuotes.map((quote, index) => (
                                <p key={index} className="opacity-80">{quote}</p>
                            ))}
                        </div>
                    </div>

                )}
            </Container>
        </div>
    );
}

export default Home;
