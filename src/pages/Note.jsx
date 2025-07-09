import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Reviews } from "../components/index";
import { useSelector } from "react-redux";
import { ID } from 'appwrite'
import conf from '../../backend/conf/conf';
import axios from 'axios';

export default function Note() {
    const [note, setNote] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = note && userData ? note.userId === userData.$id : false;

    const [rating, setRating] = useState(0);

    // const [responseState, setResponseState] = useState([]);
    const [paymentId, setPaymentId] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const createRazorpayOrder = (amount) => {
        const data = JSON.stringify({
            amount: amount,
            currency: "INR"
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/orders",
            headers: {
                "Content-Type": "application/json"
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("🧾 Order created:", response.data);
                handleRazorpayScreen(response.data); // ✅ pass full order
            })
            .catch((error) => {
                console.error("❌ Error creating order:", error);
            });
    };

    const handleRazorpayScreen = async (orderData) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            console.error("❌ Razorpay SDK failed to load");
            return;
        }

        const options = {
            key: conf.razorpayKeyId,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "Note Name",
            description: "Payment for note",
            order_id: orderData.order_id,
            handler: async function (response) {
                console.log("✅ Payment success:", response);
                appwriteService.createTransactionInfo(response.razorpay_payment_id, {
                    noteId: note.$id,
                    noteUserId: note.userId,
                    purchaseUserId: userData.$id,
                    amount: note.price
                });
                let currAmount = await appwriteService.getAmountByUserId(note.userId);
                currAmount += note.price;
                appwriteService.setAmountByUserId({ userId: note.userId, amount: currAmount });
                setPaymentId(response.razorpay_payment_id);
                setIsPaid(true);
            },
            prefill: {
                name: "Wakil",
                email: "test@gmail.com"
            },
            theme: {
                color: "blue"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


    const paymentFetch = (e) => {
        e.preventDefault();
        const paymentId = e.target.paymentId.value;
        axios.get(`http://localhost:5000/payment/${paymentId}`)
            .then((response) => {
                console.log("✅ Payment fetched:", response.data);
                // setResponseState(response.data);
            })
            .catch((error) => {
                console.error("❌ Payment fetch failed:", error);
            });
    };

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
            appwriteService.getAverageRating(note.$id).then((value) => setRating(value.toFixed(1)));
        }
    }, [note]);

    useEffect(() => {
        (async () => {
            if (note) {
                let result = await appwriteService.getTransactionInfo({
                    noteId: note.$id,
                    purchaseUserId: userData.$id
                });
                if (result) {
                    setPaymentId(result.$id);
                    setIsPaid(true);
                }
                let downloadCheck = await appwriteService.hasUserDownloadedNote({ noteId: note.$id, purchaseUserId: userData.$id });
                setIsDownloaded(downloadCheck);
            }
        })();
    }, [note, paymentId])




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
        <div className="py-10 my-10">
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

                    {note.pricing === "Paid" ? (
                        (isPaid || note.userId == userData.$id) ? (
                            <div className="mt-4">
                                {note.userId != userData.$id ? (
                                    <span className="px-3 py-1 rounded-full text-white text-sm font-medium bg-green-500">
                                        ✅ Payment Status: Paid
                                    </span>) : null
                                }
                            </div>
                        ) : (
                            <div className="mt-4 flex flex-col items-start gap-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                                    onClick={() => createRazorpayOrder(note.price)}
                                >
                                    Pay ₹{note.price}
                                </button>
                                <span className="px-3 py-1 rounded-full text-white text-sm font-medium bg-red-400">
                                    ❌ Payment Status: Not Paid
                                </span>
                            </div>
                        )
                    ) : null}



                    {/* Download Button */}

                    <div className="flex gap-4 flex-wrap">
                        {(isPaid || note.pricing === "Free" || note.userId === userData.$id) && (
                            <Button
                                onClick={() => {
                                    setIsDownloaded(true);
                                    const fileUrl = appwriteService.downloadFile(note.pdfId);
                                    appwriteService.createDownloadInfo({
                                        noteId: note.$id,
                                        noteUserId: note.userId,
                                        purchaseUserId: userData.$id
                                    });
                                    window.open(fileUrl, "_blank");
                                }}
                            >
                                Download PDF
                            </Button>
                        )}

                        {isAuthor && (
                            <>
                                <Link to={`/dashboard/edit-note/${note.$id}`}>
                                    <Button bgColor="bg-yellow-500">Edit</Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deleteNote}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>

                    <Reviews slug={slug} noteId={note.$id} noteUserId={note.userId} userId={userData.$id} userName={userData.name} hasDownloaded={isDownloaded} />


                </div>
            </Container>
        </div>
    ) : null;
}

