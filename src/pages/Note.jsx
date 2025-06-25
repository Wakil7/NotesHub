// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components/index";
// // import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Note() {
//     const [note, setNote] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = note && userData ? note.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getNote(slug).then((note) => {
//                 if (note) setNote(note);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deleteNote = () => {
//         appwriteService.deleteNote(note.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(note.coverImageId);
//                 appwriteService.deleteFile(note.pdfId);
//                 navigate("/");
//             }
//         });
//     };

//     return note ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full justify-center mb-4 relative border rounded-xl p-2">
//                     <div>{note.title}</div>
//                     <div>By {note.userName}</div>
//                     <div>Created at {note.$createdAt}</div>
//                     <div>Updated at {note.$updatedAt}</div>
//                     <div>{note.description}</div>
//                     <div>{note.pricing}</div>
//                     {
//                         note.pricing==="Paid"?(
//                             <div>Rs. {note.price}</div>
//                         ):null
//                     }
//                     <img src={appwriteService.getFileView(note.coverImageId)}></img>
//                     <Button onClick={()=>{
//                             const fileUrl = appwriteService.downloadFile(note.pdfId);
//                             window.open(fileUrl, "_blank")
//                         }
//                     }>
//                             Download File
//                     </Button>
                    
//                 </div>
//             </Container>
//         </div>
//     ) : null;
// }

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Reviews} from "../components/index";
import { useSelector } from "react-redux";
import { ID } from 'appwrite'

export default function Note() {
    const [note, setNote] = useState(null);
    // const [reviews, setReviews] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = note && userData ? note.userId === userData.$id : false;

    const [rating, setRating] = useState(0);

    

    // const { register, handleSubmit } = useForm()

    // const submitReview = async(data) =>{
    //     data.rating = Number.parseInt(data.rating);

    //     // if (review){

    //     //     const dbNote = await appwriteService.updateReview(review.$id,
    //     //          {
    //     //             ...data,
    //     //          }
    //     //         );

    //     // }
    //     // else{
    //         appwriteService.createReview({
    //             ...data,
    //             noteId: note.$id,
    //             userId: userData.$id,
    //             userName: userData.name,
    //         });

    //     // }
    // }

    useEffect(() => {
        if (slug) {
            appwriteService.getNote(slug).then((note) => {
                if (note) setNote(note);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (note) {
            appwriteService.getAverageRating(note.$id).then((value)=>setRating(value.toFixed(1)));
        }
    }, [note]);

    // useEffect(()=>{
    //     if (slug){
    //         appwriteService.getReviews(slug).then((value)=>{
    //             if (reviews) setReviews(Array.from(value.documents))
    //         });
    //     }
    // }, [submitReview])



    

    const deleteNote = () => {
        appwriteService.deleteNote(note.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(note.coverImageId);
                appwriteService.deleteFile(note.pdfId);
                navigate("/");
            }
        });
    };

    return note ? (
        <div className="py-10">
            <Container>
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
                    
                    {/* Title and Author and Rating */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">{note.title}</h1>
                        <p className="text-sm text-gray-500">
                            By <span className="font-medium">{note.userName}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Rating <span className="font-medium">{rating}</span>
                        </p>
                    </div>

                    {/* Timestamps */}
                    <div className="text-sm text-gray-400 space-y-1">
                        <p>Created: {new Date(note.$createdAt).toLocaleString()}</p>
                        <p>Updated: {new Date(note.$updatedAt).toLocaleString()}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{note.description}</p>
                    </div>

                    {/* Pricing */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Pricing</h2>
                        <p className="text-gray-700">
                            {note.pricing === "Free" ? "Free" : `Paid - ₹${note.price}`}
                        </p>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Cover Image</h2>
                        <img
                            src={appwriteService.getFileView(note.coverImageId)}
                            alt="Cover"
                            className="w-full max-h-96 object-contain rounded-lg border"
                        />
                    </div>

                    {/* Download Button */}
                    <div className="flex gap-4 flex-wrap">
                        <Button
                            onClick={() => {
                                appwriteService.createTransactionInfo(ID.unique(), {noteId: note.$id, userId: userData.$id})
                                const fileUrl = appwriteService.downloadFile(note.pdfId);
                                appwriteService.createDownloadInfo({noteId: note.$id, userId: userData.$id})
                                window.open(fileUrl, "_blank");
                            }}
                        >
                            Download PDF
                        </Button>

                        {isAuthor && (
                            <>
                                <Link to={`/edit-note/${note.$id}`}>
                                    <Button bgColor="bg-yellow-500">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deleteNote}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>

                    <Reviews slug={slug} noteId={note.$id} userId={userData.$id} userName={userData.name}/>

                    {/* <div>
                        <form onSubmit={handleSubmit(submitReview)}>
                            <div className="px-2">
                                
                                <TextArea label="Comment :"
                                placeholder="Write your comment here..."
                                rows={2}
                                className="mb-4"
                                {...register("comment", {required: true})}
                                />

                                <Input
                                    label="Rating :"
                                    placeholder="rating"
                                    className="mb-4"
                                    {...register("rating", { required: true })}
                                />
                                <Button type="submit" className="w-full">
                                    {}Submit
                                </Button>

                            </div>
                        </form>
                        {reviews && (
                            reviews.map((review)=>(
                                <div key={review.$id}>
                                    <div>{review.userName}</div>
                                    <div>{review.comment}</div>
                                    <div>{review.rating}</div>
                                </div>
                            ))
                        )}
                    </div> */}


                </div>
            </Container>
        </div>
    ) : null;
}

// 7->2nd, 8->2nd, 9->Full, 11->Full, 12->Full, 13->Full
