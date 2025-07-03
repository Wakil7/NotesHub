import React, { useState, useEffect } from 'react';
import { TextArea, Button } from './index';
import appwriteService from '../appwrite/config';
import { useForm } from 'react-hook-form';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';

function Reviews({ slug, noteId, userId, userName, hasPaid }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [editing, setEditing] = useState(false);

    // Load reviews and separate user's review
    const fetchReviews = async () => {
        const res = await appwriteService.getReviews(slug);
        const docs = Array.from(res.documents);
        const found = docs.find((r) => r.userId === userId);
        setUserReview(found || null);
        const others = docs.filter((r) => r.userId !== userId);
        setReviews(found ? [found, ...others] : others);
    };

    useEffect(() => {
        if (slug) fetchReviews();
    }, [slug]);

    // Submit or update review
    const submitReview = async (data) => {
        if (rating === 0) return alert('Please select a rating');
        if (!hasPaid) return alert('Only paid users can review');

        if (editing && userReview) {
            await appwriteService.updateReview(userReview.$id, {
                ...data,
                rating,
            });
        } else {
            await appwriteService.createReview({
                ...data,
                rating,
                noteId,
                userId,
                userName,
            });
        }

        reset();
        setRating(0);
        setEditing(false);
        fetchReviews();
    };

    // Start editing
    const startEditing = () => {
        if (!userReview) return;
        setEditing(true);
        setRating(userReview.rating);
        setValue("comment", userReview.comment);
    };

    // Delete review
    const deleteReview = async () => {
        if (!userReview) return;
        await appwriteService.deleteReview(userReview.$id);
        reset();
        setRating(0);
        setEditing(false);
        fetchReviews();
    };

    return (
        <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>

            {/* User Review or Review Form */}
            {!hasPaid ? (
                <div className="text-red-500 font-medium mb-6">
                    You need to purchase this note to submit a review.
                </div>
            ) : userReview && !editing ? (
                <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-300 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="font-semibold text-gray-900">{userReview.userName} (You)</div>
                            <div className="text-sm text-gray-500">
                                Last updated: {new Date(userReview.$updatedAt).toLocaleString()}
                            </div>
                            <div className="text-gray-700 mt-2">{userReview.comment}</div>
                            <div className="text-yellow-500 mt-1 flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <FaStar
                                        key={i}
                                        size={16}
                                        className={i <= userReview.rating ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                                <span className="text-sm text-gray-600 ml-1">{userReview.rating}/5</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-1 text-sm text-gray-600">
                            <FaEdit
                                className="cursor-pointer hover:text-blue-500"
                                title="Edit"
                                onClick={startEditing}
                            />
                            <FaTrash
                                className="cursor-pointer hover:text-red-500"
                                title="Delete"
                                onClick={deleteReview}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(submitReview)} className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 mb-6">
                    <TextArea
                        label="Comment"
                        placeholder="Write your comment here..."
                        rows={3}
                        className="w-full"
                        {...register("comment", { required: true })}
                    />
                    <div className="flex items-center gap-2">
                        <label className="font-medium text-gray-700">Rating:</label>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={24}
                                className={`cursor-pointer transition-colors ${
                                    (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                        {rating > 0 && <span className="ml-2 text-sm text-gray-600">{rating}/5</span>}
                    </div>
                    <Button type="submit" className="w-full">
                        {editing ? "Update Review" : "Submit Review"}
                    </Button>
                </form>
            )}

            {/* All Other Reviews */}
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No other reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        review.userId !== userId && (
                            <div key={review.$id} className="bg-white p-4 rounded-lg shadow border">
                                <div className="font-semibold text-gray-900">{review.userName}</div>
                                <div className="text-sm text-gray-500">
                                    Last updated: {new Date(review.$updatedAt).toLocaleString()}
                                </div>
                                <div className="text-gray-700 mt-2">{review.comment}</div>
                                <div className="text-yellow-500 mt-1 flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <FaStar
                                            key={i}
                                            size={16}
                                            className={i <= review.rating ? "text-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-1">{review.rating}/5</span>
                                </div>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default Reviews;
