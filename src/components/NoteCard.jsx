// import React from "react"
// import appwriteService from "../appwrite/config"
// import {Link} from "react-router-dom"

// function NoteCard({$id, title, coverImageId}){

//     return (
//         <Link to={`/note/${$id}`}>
//             <div className="w-full bg-gray-100 rounded-xl p-4">
//                 <div className="w-full justify-center mb-4">
//                     <img src={appwriteService.getFileView(coverImageId)}
//                     alt={title}
//                     className="rounded-xl"
//                     />
//                 </div>
//                 <h2 className="text-xl font-bold">{title}</h2>
//             </div>
//         </Link>
//     )
// }

// export default NoteCard

import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function NoteCard({ $id, title, coverImageId, pricing, price, userName }) {
    return (
        <Link to={`/note/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 shadow hover:shadow-md transition duration-300">

                {/* Cover Image */}
                <div className="w-48 aspect-[16/9] rounded-lg overflow-hidden border bg-gray-100">
                    <img
                        src={appwriteService.getFileView(coverImageId)}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>

                {/* Author */}
                <p className="text-sm text-gray-500 mb-2">By {userName}</p>

                {/* Pricing Info */}
                <div className="text-sm text-gray-700 font-medium">
                    {pricing === "Paid" ? (
                        <span className="text-green-700">Paid - ₹{price}</span>
                    ) : (
                        <span className="text-blue-700">Free</span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default NoteCard;
