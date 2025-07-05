import { useEffect, useState } from 'react';
import { Star, Download } from 'lucide-react';
import appwriteService from '../appwrite/config';

export default function StatsInfo({
    $id,
    title,
    coverImageId,
    pricing,
    price,
    uploadDate,
    updateDate,
    totalReviews = 0,
    totalEarnings = 0,
}) {
    const [downloads, setDownloads] = useState(0);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        appwriteService.getTotalDownloadsCount($id).then(setDownloads);
        appwriteService.getAverageRating($id).then((val) =>
            setRating(parseFloat(val).toFixed(1))
        );
    }, [$id]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-6 w-full hover:shadow-md transition">
            {/* Cover Image */}
            <div className="w-48 aspect-[16/9] rounded-lg overflow-hidden border bg-gray-100 shrink-0">
                <img
                    src={appwriteService.getFileView(coverImageId)}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Two Columns of Info */}
            <div className="flex-1 grid grid-cols-2 gap-4">
                {/* Column 1 */}
                <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-medium text-gray-800">Title:</span> {title}</p>
                    <p className="flex items-center gap-1">
                        <span className="font-medium text-gray-800">Rating:</span>
                        <Star size={16} className="text-yellow-500" />
                        {(rating === "NaN") ? 0 : rating} / 5
                    </p>
                    <p>
                        <span className="font-medium text-gray-800">Published:</span>{' '}
                        {new Date(uploadDate).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-medium text-gray-800">Modified:</span>{' '}
                        {new Date(updateDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Column 2 */}
                <div className="text-sm text-gray-700 space-y-1">
                    <p>
                        <span className="font-medium text-gray-800">Pricing:</span>{' '}
                        {pricing === 'Free' ? 'Free' : `₹${price}`}
                    </p>
                    <p>
                        <span className="font-medium text-gray-800">Total Reviews:</span>{' '}
                        {totalReviews}
                    </p>
                    <p className="flex items-center gap-1">
                        <Download size={16} />{' '}
                        <span className="font-medium text-gray-800">Total Downloads:</span>{' '}
                        {downloads}
                    </p>
                    <p>
                        <span className="font-medium text-gray-800">Total Earnings:</span>{' '}
                        ₹{totalEarnings}
                    </p>
                </div>
            </div>
        </div>
    );
}
